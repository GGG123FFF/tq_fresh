/**
 * OCR adapter.
 *
 * Text recognition has to be native — Tesseract in a WebView means shipping
 * megabytes of wasm and waiting seconds per frame on a mid-range phone. ML Kit
 * is on-device, free and fast, and several Capacitor wrappers expose it.
 *
 * None of them are installed yet, so this detects whichever is present at
 * runtime and reports clearly when none is. See INSTALL below.
 */

function plugins() {
  const cap = window.Capacitor;
  return (cap && cap.Plugins) || {};
}

export const INSTALL = [
  'npm i @capacitor/camera @jcesarmobile/capacitor-ocr',
  'npx cap sync android',
].join('\n');

export function available() {
  const p = plugins();
  return !!(p.Ocr || p.MlKitTextRecognition || p.CapacitorOcr);
}

export function cameraAvailable() {
  return !!plugins().Camera;
}

/** Take a photo. Returns { dataUrl, path }. */
export async function capture() {
  const { Camera } = plugins();
  if (!Camera) throw new Error('Camera plugin not installed.');
  const photo = await Camera.getPhoto({
    quality: 88,
    allowEditing: false,
    resultType: 'dataUrl',
    source: 'CAMERA',
    correctOrientation: true,
    width: 1400,
  });
  return { dataUrl: photo.dataUrl, path: photo.path };
}

/**
 * Run OCR. Returns lines as [{ text, box: { x, y, width, height } }] where the
 * plugin gives geometry — identify() weighs position heavily, so a plugin that
 * returns boxes is markedly more accurate than one that returns a flat string.
 */
export async function recognise({ dataUrl, path }) {
  const p = plugins();

  if (p.Ocr && p.Ocr.process) {              // @jcesarmobile/capacitor-ocr
    const res = await p.Ocr.process({ image: dataUrl || path });
    return flatten(res);
  }
  if (p.Ocr && p.Ocr.detectText) {           // @capacitor-community/image-to-text
    const res = await p.Ocr.detectText({ filename: path });
    return (res.textDetections || []).map((d) => ({ text: d.text }));
  }
  if (p.MlKitTextRecognition) {              // @pantrist/...ml-kit-text-recognition
    const res = await p.MlKitTextRecognition.detectText({
      base64Image: (dataUrl || '').replace(/^data:image\/\w+;base64,/, ''),
    });
    return flatten(res);
  }
  throw new Error('No OCR plugin installed.');
}

/** Normalise the various result shapes into lines with boxes where possible. */
function flatten(res) {
  const out = [];
  const push = (text, frame) => {
    if (!text) return;
    const b = frame && (frame.boundingBox || frame.bounds || frame.frame || frame.cornerPoints);
    out.push(b && b.height != null
      ? { text, box: { x: b.x || b.left || 0, y: b.y || b.top || 0, width: b.width, height: b.height } }
      : { text });
  };
  const blocks = res.blocks || res.textBlocks || res.results || [];
  for (const block of blocks) {
    const lines = block.lines || [block];
    for (const line of lines) push(line.text, line);
  }
  if (!out.length && typeof res.text === 'string') {
    res.text.split('\n').forEach((t) => push(t.trim()));
  }
  return out;
}

/** The tallest line is almost always the card name; useful when boxes exist. */
export function imageHeightFrom(lines) {
  const ys = lines.filter((l) => l.box).map((l) => l.box.y + (l.box.height || 0));
  return ys.length ? Math.max(...ys) * 1.06 : undefined;
}
