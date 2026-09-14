/**
 * Live deck scanning.
 *
 * The photo flow hands off to the OS camera app and comes back, which is fine
 * for one card and miserable for ninety-nine. This keeps the camera inside the
 * app: hold a card in the frame, it reads it, you move to the next one.
 *
 * No new plugin. Capacitor serves this app from https://localhost, which is a
 * secure context, so getUserMedia works in the WebView — provided CAMERA is in
 * the manifest. Android has two independent permission layers here: the OS
 * grant and the WebView's own PermissionRequest. Capacitor's WebChromeClient
 * handles the second once the first is granted, but if either fails this falls
 * back to the photo flow rather than dead-ending.
 *
 * Only the title band is sent to OCR — about the top eighth of the card. It is
 * roughly ten times less pixels than the whole frame, which is most of why
 * this can run every second or so on a mid-range phone.
 */
import { identify } from './identify.js';
import { recognise, available as ocrAvailable } from './ocr.js';

const TICK_MS = 900;          // gap between reads
const CONFIRM_MS = 1400;      // how long the same card must hold before it counts
const REPEAT_LOCK_MS = 2500;  // ignore a card just added, so one card isn't added twice

const C = {
  ink: 'var(--tq-ink)', dim: 'var(--tq-ink-dim)', gold: 'var(--tq-gold)',
  bright: 'var(--tq-gold-bright)', warn: 'var(--tq-danger)', edge: 'var(--tq-edge)',
};
const DISPLAY = 'var(--tq-display)';
const BODY = 'var(--tq-text)';
const MONO = 'var(--tq-mono)';

function el(tag, style, text) {
  const n = document.createElement(tag);
  Object.assign(n.style, style || {});
  if (text != null) n.textContent = text;
  return n;
}

function button(label, primary, onClick) {
  const b = el('button', {
    minHeight: 'var(--tq-tap)', padding: '0 16px', borderRadius: '4px',
    fontFamily: DISPLAY, fontSize: '11px', letterSpacing: '0.16em',
    textTransform: 'uppercase', cursor: 'pointer',
    border: '1px solid ' + C.edge,
    background: primary ? 'linear-gradient(180deg, var(--tq-gold-bright), var(--tq-gold))' : 'rgba(5,3,4,0.7)',
    color: primary ? '#1a1208' : C.ink,
  }, label);
  b.onclick = onClick;
  return b;
}

export async function openLiveScanner(onDone) {
  const found = [];
  let stream = null;
  let timer = null;
  let stopped = false;

  // What we're currently looking at, and since when.
  let pending = null;
  let pendingSince = 0;
  const recentlyAdded = new Map();   // name -> timestamp

  const overlay = el('div', {
    position: 'fixed', inset: '0', zIndex: '150',
    background: '#000', display: 'flex', flexDirection: 'column',
  });

  const stage = el('div', { position: 'relative', flex: '1', overflow: 'hidden' });
  const video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.autoplay = true;
  video.muted = true;
  Object.assign(video.style, {
    position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover',
  });
  stage.appendChild(video);

  // Card guide. 63x88mm is a Magic card; the guide keeps that ratio so people
  // frame it consistently, which matters more for OCR than resolution does.
  const guide = el('div', {
    position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)',
    width: '74%', aspectRatio: '63 / 88', borderRadius: '10px',
    border: '2px solid ' + C.gold, boxShadow: '0 0 0 100vmax rgba(0,0,0,0.55)',
    pointerEvents: 'none',
  });
  // The band we actually read.
  const band = el('div', {
    position: 'absolute', left: '4%', right: '4%', top: '4%', height: '13%',
    border: '1px dashed var(--tq-gold-bright)', borderRadius: '3px',
    background: 'rgba(245,217,143,0.06)',
  });
  guide.appendChild(band);
  stage.appendChild(guide);

  const status = el('div', {
    position: 'absolute', left: '0', right: '0', bottom: '10px', textAlign: 'center',
    fontFamily: BODY, fontSize: '15px', color: C.ink,
    textShadow: '0 1px 6px rgba(0,0,0,0.9)', padding: '0 16px',
  }, 'Line the card name up inside the dashes.');
  stage.appendChild(status);

  const tally = el('div', {
    position: 'absolute', top: 'max(12px, env(safe-area-inset-top))', left: '12px',
    fontFamily: MONO, fontSize: '13px', color: C.bright,
    background: 'rgba(5,3,4,0.72)', padding: '6px 10px', borderRadius: '4px',
    border: '1px solid ' + C.edge,
  }, '0 cards');
  stage.appendChild(tally);

  const last = el('div', {
    position: 'absolute', top: 'max(12px, env(safe-area-inset-top))', right: '12px',
    left: '96px', textAlign: 'right', fontFamily: BODY, fontSize: '14px',
    color: C.dim, textShadow: '0 1px 6px rgba(0,0,0,0.9)',
  }, '');
  stage.appendChild(last);

  const foot = el('div', {
    display: 'flex', gap: '8px', padding: '10px 12px',
    paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
    background: '#05030a', borderTop: '1px solid ' + C.edge,
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  /** Crop the title band out of the current video frame. */
  function grabBand() {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return null;

    // The guide is 74% of the stage width at a 63:88 ratio, centred at 46%.
    // Work in video pixels via the same proportions, allowing for object-fit
    // cover cropping the longer axis.
    const sRatio = stage.clientWidth / stage.clientHeight;
    const vRatio = vw / vh;
    let cw = vw, chh = vh, ox = 0, oy = 0;
    if (vRatio > sRatio) { cw = vh * sRatio; ox = (vw - cw) / 2; }
    else { chh = vw / sRatio; oy = (vh - chh) / 2; }

    const gw = cw * 0.74;
    const gh = gw * (88 / 63);
    const gx = ox + (cw - gw) / 2;
    const gy = oy + chh * 0.46 - gh / 2;

    const bx = gx + gw * 0.04;
    const by = gy + gh * 0.04;
    const bw = gw * 0.92;
    const bh = gh * 0.13;
    if (bw < 8 || bh < 4) return null;

    // Upscale a little: ML Kit reads small text better with more pixels, and
    // the band is tiny to begin with.
    const scale = Math.min(3, Math.max(1, 900 / bw));
    canvas.width = Math.round(bw * scale);
    canvas.height = Math.round(bh * scale);
    ctx.drawImage(video, bx, by, bw, bh, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85);
  }

  function setStatus(text, warn) {
    status.textContent = text;
    status.style.color = warn ? C.warn : C.ink;
  }

  function add(name) {
    const hit = found.find((f) => f.name.toLowerCase() === name.toLowerCase());
    if (hit) hit.qty += 1;
    else found.push({ name, qty: 1 });
    recentlyAdded.set(name.toLowerCase(), Date.now());
    tally.textContent = found.reduce((a, f) => a + f.qty, 0) + ' cards';
    last.textContent = (hit ? `${name} x${hit.qty}` : name);
    if (window.TQ && window.TQ.haptic) window.TQ.haptic(18);
    guide.animate(
      [{ borderColor: 'var(--tq-gold-bright)' }, { borderColor: '#7fdc8a' }, { borderColor: 'var(--tq-gold)' }],
      { duration: 500 },
    );
  }

  async function tick() {
    if (stopped) return;
    try {
      const dataUrl = grabBand();
      if (dataUrl) {
        const lines = await recognise({ dataUrl });
        if (lines.length) {
          const result = await identify(lines, { minConfidence: 0.55 });
          if (result) {
            const name = result.card.name;
            const lockedUntil = (recentlyAdded.get(name.toLowerCase()) || 0) + REPEAT_LOCK_MS;
            if (Date.now() < lockedUntil) {
              setStatus('Next card…');
            } else if (pending === name) {
              // Hold the same reading briefly before committing. A single frame
              // is too easy to misread; two in a row almost never is.
              if (Date.now() - pendingSince >= CONFIRM_MS) {
                add(name);
                pending = null;
                setStatus('Next card…');
              } else {
                setStatus(`${name}…  hold still`);
              }
            } else {
              pending = name;
              pendingSince = Date.now();
              setStatus(`${name}…  hold still`);
            }
          } else {
            pending = null;
            setStatus('Read the text but no match. Try a touch closer.');
          }
        } else {
          pending = null;
          setStatus('Line the card name up inside the dashes.');
        }
      }
    } catch (err) {
      setStatus(err.message || String(err), true);
    }
    timer = setTimeout(tick, TICK_MS);
  }

  function close(commit) {
    stopped = true;
    clearTimeout(timer);
    if (stream) stream.getTracks().forEach((t) => t.stop());
    overlay.remove();
    if (commit && onDone) {
      onDone(found.map((f) => `${f.qty} ${f.name}`).join('\n'), found);
    }
  }

  const doneBtn = button('Done', true, () => close(true));
  const cancelBtn = button('Cancel', false, () => close(false));
  doneBtn.style.flex = '1';
  foot.append(cancelBtn, doneBtn);
  overlay.append(stage, foot);
  document.body.appendChild(overlay);

  // --- start the camera ---------------------------------------------------
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return fallback(overlay, foot, setStatus, close,
      'This build cannot open the camera in-app.');
  }
  if (!ocrAvailable()) {
    return fallback(overlay, foot, setStatus, close,
      'No OCR plugin installed in this build.');
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
    timer = setTimeout(tick, 600);
  } catch (err) {
    const msg = err && err.name === 'NotAllowedError'
      ? 'Camera permission was refused.'
      : 'Could not open the camera in-app.';
    return fallback(overlay, foot, setStatus, close, msg);
  }
}

/**
 * If the live path fails for any reason — permission, an older WebView, a
 * device that will not hand the camera to the WebView — offer the photo flow
 * rather than leaving a dead screen.
 */
function fallback(overlay, foot, setStatus, close, message) {
  setStatus(message + ' Use single photos instead.', true);
  const b = button('Photo mode', true, () => {
    close(false);
    if (window.TQ && window.TQ.openScanner) window.TQ.openScanner();
  });
  b.style.flex = '1';
  foot.prepend(b);
}

export function install() {
  window.TQ = window.TQ || {};
  window.TQ.openLiveScanner = openLiveScanner;
}
