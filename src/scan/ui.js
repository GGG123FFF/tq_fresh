/**
 * Scanner panel.
 *
 * Opened from the Vault's deck form. Scans cards one at a time, accumulates a
 * list, and hands it back as decklist text — which is exactly what the Odds
 * tab already eats, so a scanned deck can be simulated straight away.
 *
 * Every result is shown for confirmation before it's added. OCR gets things
 * wrong and silently adding the wrong card to someone's deck list is worse
 * than asking.
 */
import { identify, identifyMany } from './identify.js';
import { available, cameraAvailable, capture, recognise, imageHeightFrom, INSTALL } from './ocr.js';

const C = {
  ink: 'var(--tq-ink)', dim: 'var(--tq-ink-dim)', faint: 'var(--tq-ink-faint)',
  gold: 'var(--tq-gold)', bright: 'var(--tq-gold-bright)', warn: 'var(--tq-danger)',
  panel: 'var(--tq-surface)', deep: 'var(--tq-surface-deep)', edge: 'var(--tq-edge)',
};
const DISPLAY = 'var(--tq-display)';
const BODY = 'var(--tq-text)';
const MONO = 'var(--tq-mono)';

function el(tag, style, ...kids) {
  const n = document.createElement(tag);
  Object.assign(n.style, style || {});
  for (const k of kids) if (k) n.append(k);
  return n;
}

function button(label, primary, onClick) {
  const b = el('button', {
    minHeight: 'var(--tq-tap)', padding: '0 16px', borderRadius: '4px',
    fontFamily: DISPLAY, fontSize: '11px', letterSpacing: '0.16em',
    textTransform: 'uppercase', cursor: 'pointer', border: '1px solid ' + C.edge,
    background: primary ? 'linear-gradient(180deg, var(--tq-gold-bright), var(--tq-gold))' : 'transparent',
    color: primary ? '#1a1208' : C.dim,
  }, label);
  b.onclick = onClick;
  return b;
}

export function openScanner(onDone) {
  const found = [];                 // [{ name, qty }]
  let fanned = false;               // one photo of several overlapping cards

  const overlay = el('div', {
    position: 'fixed', inset: '0', zIndex: '140', display: 'flex',
    flexDirection: 'column', background: 'rgba(5,3,4,0.96)',
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
  });

  const head = el('div', {
    padding: '16px 16px 10px', textAlign: 'center', borderBottom: '1px solid ' + C.edge,
  });
  head.append(el('div', {
    fontFamily: DISPLAY, fontSize: '11px', letterSpacing: '0.25em',
    textTransform: 'uppercase', color: C.gold,
  }, 'Scan Cards'));

  const status = el('div', {
    fontFamily: BODY, fontSize: '14px', color: C.dim, marginTop: '6px',
  }, 'Point at a card and hold steady.');
  head.append(status);

  // Fanned mode reads several cards from one photo. Spread the pile so each
  // title bar is visible and shoot the lot - much faster than one at a time
  // for a whole deck.
  const modes = el('div', { display: 'flex', gap: '6px', marginTop: '10px', justifyContent: 'center' });
  const modeBtn = (label, isFan) => {
    const b = el('button', {
      minHeight: '34px', padding: '0 14px', borderRadius: '3px', cursor: 'pointer',
      fontFamily: DISPLAY, fontSize: '10px', letterSpacing: '0.14em',
      textTransform: 'uppercase', border: '1px solid ' + C.edge,
      background: 'transparent', color: C.dim,
    }, label);
    b.onclick = () => {
      fanned = isFan;
      [...modes.children].forEach((c) => {
        c.style.color = C.dim;
        c.style.borderColor = C.edge;
      });
      b.style.color = C.bright;
      b.style.borderColor = 'var(--tq-edge-strong)';
      status.textContent = isFan
        ? 'Fan the pile so every title bar shows, then shoot once.'
        : 'Point at a card and hold steady.';
      status.style.color = C.dim;
    };
    return b;
  };
  const single = modeBtn('One card', false);
  modes.append(single, modeBtn('Fanned pile', true));
  head.append(modes);
  single.style.color = C.bright;
  single.style.borderColor = 'var(--tq-edge-strong)';

  const list = el('div', { flex: '1', overflowY: 'auto', padding: '12px 16px' });

  const foot = el('div', {
    padding: '12px 16px', display: 'flex', gap: '8px',
    borderTop: '1px solid ' + C.edge,
  });

  const render = () => {
    list.textContent = '';
    if (!found.length) {
      list.append(el('p', {
        fontFamily: BODY, fontSize: '14px', color: C.faint, textAlign: 'center', marginTop: '28px',
      }, 'Nothing scanned yet.'));
      return;
    }
    for (const entry of found) {
      const row = el('div', {
        display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0',
        borderBottom: '1px solid ' + C.edge,
      });
      row.append(el('span', { fontFamily: MONO, fontSize: '13px', color: C.gold, width: '26px' }, String(entry.qty)));
      row.append(el('span', { fontFamily: BODY, fontSize: '15px', color: C.ink, flex: '1' }, entry.name));
      const rm = button('×', false, () => {
        found.splice(found.indexOf(entry), 1);
        render();
      });
      Object.assign(rm.style, { minHeight: '34px', padding: '0 12px', fontSize: '15px' });
      row.append(rm);
      list.append(row);
    }
  };

  const add = (name) => {
    const hit = found.find((f) => f.name.toLowerCase() === name.toLowerCase());
    if (hit) hit.qty += 1;
    else found.unshift({ name, qty: 1 });
    render();
  };

  /** Show what we think it is and let the user confirm before it's added. */
  const confirm = (result) => {
    const card = result.card;
    const box = el('div', {
      margin: '10px 0 14px', padding: '12px', borderRadius: '4px',
      background: C.panel, border: '1px solid ' + (result.uncertain ? C.warn : C.edge),
    });
    box.append(el('div', {
      fontFamily: DISPLAY, fontSize: '11px', letterSpacing: '0.14em',
      textTransform: 'uppercase', color: result.uncertain ? C.warn : C.gold,
    }, result.uncertain ? 'Not sure — is this right?' : 'Found'));
    box.append(el('div', { fontFamily: BODY, fontSize: '17px', color: C.ink, margin: '6px 0 2px' }, card.name));
    box.append(el('div', { fontFamily: MONO, fontSize: '11px', color: C.faint },
      `${(card.set || '').toUpperCase()} ${card.collector_number || ''} · ${Math.round(result.confidence * 100)}% · ${result.via}`));

    const row = el('div', { display: 'flex', gap: '8px', marginTop: '10px' });
    row.append(button('Add', true, () => { add(card.name); box.remove(); }));
    for (const alt of (result.alternatives || []).slice(0, 2)) {
      row.append(button(alt.card.name.slice(0, 18), false, () => { add(alt.card.name); box.remove(); }));
    }
    row.append(button('Discard', false, () => box.remove()));
    box.append(row);
    list.prepend(box);
  };

  const scan = async () => {
    if (!available()) {
      status.textContent = 'No OCR plugin installed on this build.';
      status.style.color = C.warn;
      return;
    }
    try {
      status.textContent = fanned ? 'Reading the pile…' : 'Reading…';
      status.style.color = C.dim;
      const shot = await capture();
      const lines = await recognise(shot);
      if (!lines.length) {
        status.textContent = 'Could not read any text. Try more light, less angle.';
        status.style.color = C.warn;
        return;
      }
      if (fanned) {
        status.textContent = 'Matching…';
        const results = await identifyMany(lines);
        if (!results.length) {
          status.textContent = 'No cards matched. Spread the pile wider and try again.';
          status.style.color = C.warn;
          return;
        }
        // Confident hits go straight in; anything doubtful still gets asked.
        let added = 0;
        for (const r of results.reverse()) {
          if (r.uncertain || r.confidence < 0.8) confirm(r);
          else { add(r.card.name); added += 1; }
        }
        status.textContent = `${results.length} read, ${added} added straight off.`;
        status.style.color = C.dim;
        return;
      }
      const result = await identify(lines, { imageHeight: imageHeightFrom(lines) });
      if (!result) {
        status.textContent = 'Read the text but could not match a card. Try again or type it in.';
        status.style.color = C.warn;
        return;
      }
      status.textContent = 'Point at the next card.';
      status.style.color = C.dim;
      confirm(result);
    } catch (err) {
      status.textContent = err.message || String(err);
      status.style.color = C.warn;
    }
  };

  const close = (commit) => {
    overlay.remove();
    if (commit && onDone) {
      onDone(found.map((f) => `${f.qty} ${f.name}`).join('\n'), found);
    }
  };

  foot.append(button('Done', true, () => close(true)));
  const scanBtn = button('Scan a card', false, scan);
  scanBtn.style.flex = '1';
  foot.prepend(scanBtn);
  foot.append(button('Cancel', false, () => close(false)));

  if (!available() || !cameraAvailable()) {
    status.textContent = 'Scanning needs the camera and OCR plugins in this build.';
    status.style.color = C.warn;
    const hint = el('pre', {
      fontFamily: MONO, fontSize: '11px', color: C.faint, whiteSpace: 'pre-wrap',
      marginTop: '10px', textAlign: 'left',
    }, INSTALL);
    head.append(hint);
  }

  overlay.append(head, list, foot);
  document.body.append(overlay);
  render();
}

export function install() {
  window.TQ = window.TQ || {};
  window.TQ.openScanner = openScanner;
  window.TQ.identifyCard = identify;
}
