/**
 * Turn OCR output into a Magic card.
 *
 * The OCR engine gives us every scrap of text on the card — name, type line,
 * rules text, flavour, artist, legal line, collector number. Most of that is
 * noise. This picks the signal out of it and resolves against Scryfall.
 *
 * Two paths, in order of confidence:
 *
 *   1. Set code + collector number. Modern cards print these bottom-left
 *      ("0123/0281 U" and "MH3 • EN"). That pair identifies an exact printing,
 *      so when we can read it, we don't need the name at all.
 *   2. The card name. Top line, above the type line. Fuzzy-matched, with OCR
 *      confusion variants generated for the usual suspects.
 *
 * Everything here is pure apart from the fetches, so the hard part — deciding
 * which line is the name — is testable without a camera.
 */

const SCRYFALL = 'https://api.scryfall.com';

// Lines that are definitely not a card name.
const NOT_A_NAME = [
  /^\s*$/,
  /^[\d\s/|.,:;'"*+\-—–]+$/,                       // pure numbers/punctuation
  /^(legendary\s+)?(creature|instant|sorcery|artifact|enchantment|land|planeswalker|battle|kindred|tribal)\b/i,
  /^(basic|snow|world)\s+(land|enchantment)/i,
  /\b(illus|illustrated by|artist)\b/i,
  /™|©|\bwizards of the coast\b|\bhasbro\b/i,
  /^\d+\s*\/\s*\d+$/,                              // power/toughness
  /^[A-Z]{2,6}\s*[•·]\s*[A-Z]{2}$/,                // "MH3 • EN"
  /^\d{1,4}\s*\/\s*\d{1,4}\s*[A-Z]?$/,             // collector number
  /^(NOT FOR SALE|PROXY)$/i,
  /^[WUBRGCXYZ0-9/{}()\[\]\s]{1,10}$/i,           // a bare mana cost
];

// ML Kit's most common confusions on Magic's title typeface (Beleren).

export function normaliseLine(s) {
  return String(s)
    .replace(/[’‘`´]/g, "'")
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Strip the mana cost that often trails a scanned title. */
export function stripManaCost(name) {
  return name
    .replace(/\s*[({\[][WUBRGCXYZ0-9/]{1,6}[)}\]]\s*/gi, ' ')
    .replace(/\s+[WUBRGC0-9]{1,8}\s*$/i, '')
    .trim();
}

/**
 * Pick the most likely card-name lines, best first.
 *
 * `lines` may be plain strings, or objects with a `box` ({ y, height }) when
 * the engine gives geometry — position is a much stronger signal than text
 * shape, so we use it when it's there.
 */
export function nameCandidates(lines, { imageHeight } = {}) {
  const items = lines
    .map((l, i) => (typeof l === 'string' ? { text: l, index: i } : { ...l, index: i }))
    .map((l) => ({ ...l, text: normaliseLine(l.text) }))
    .filter((l) => l.text.length >= 2 && l.text.length <= 40)
    .filter((l) => !NOT_A_NAME.some((re) => re.test(l.text)))
    .filter((l) => /[A-Za-z]/.test(l.text));

  const scored = items.map((l) => {
    let score = 0;
    // Position: the name is in the top fifth of the card.
    if (l.box && imageHeight) {
      const rel = (l.box.y + (l.box.height || 0) / 2) / imageHeight;
      if (rel < 0.12) score += 60;
      else if (rel < 0.2) score += 40;
      else if (rel < 0.3) score += 10;
      else score -= 30;
    } else {
      score += Math.max(0, 24 - l.index * 8);   // fall back to reading order
    }
    // Title case is the norm for card names.
    const words = l.text.split(' ');
    const capped = words.filter((w) => /^[A-Z]/.test(w)).length;
    if (capped / words.length > 0.6) score += 14;
    // Names are short; rules text is not.
    if (words.length <= 5) score += 8;
    if (l.text.length > 28) score -= 10;
    // Rules text gives itself away.
    if (/[.:;]$/.test(l.text)) score -= 14;
    if (/\b(when|whenever|target|each|you may|enters|draw|destroy)\b/i.test(l.text)) score -= 25;
    return { text: stripManaCost(l.text), score };
  });

  const seen = new Set();
  return scored
    .sort((a, b) => b.score - a.score)
    .filter((c) => c.text && !seen.has(c.text.toLowerCase()) && seen.add(c.text.toLowerCase()))
    .slice(0, 5);
}

/** Find a set code and collector number if the card prints them. */
export function findPrinting(lines) {
  const text = lines.map((l) => normaliseLine(typeof l === 'string' ? l : l.text));
  let number = null;
  let set = null;
  for (const line of text) {
    const n = line.match(/\b(\d{1,4})\s*\/\s*\d{1,4}\b/);
    if (n && !number) number = String(parseInt(n[1], 10));
    const s = line.match(/\b([A-Z0-9]{3,5})\s*[•·*]\s*[A-Z]{2}\b/);
    if (s && !set) set = s[1].toLowerCase();
  }
  return set && number ? { set, number } : null;
}

// --- similarity -------------------------------------------------------------
function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function similarity(a, b) {
  a = norm(a); b = norm(b);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const grams = (s) => {
    const g = new Map();
    for (let i = 0; i < s.length - 1; i++) {
      const k = s.slice(i, i + 2);
      g.set(k, (g.get(k) || 0) + 1);
    }
    return g;
  };
  const ga = grams(a), gb = grams(b);
  let hits = 0;
  for (const [k, v] of ga) if (gb.has(k)) hits += Math.min(v, gb.get(k));
  const total = (a.length - 1) + (b.length - 1);
  return total ? (2 * hits) / total : 0;
}

/** Generate a few OCR-confusion variants of a name, best-effort. */
const DIGIT_TO_LETTER = { 0: 'O', 1: 'l', 5: 'S', 8: 'B', 6: 'G', 2: 'Z' };

// Characters OCR swaps for one another, as classes. Order matters only for
// which gets tried first when the budget is tight.
const SWAP_CLASSES = ['tli1I', 'oO0Q', 'sS5', 'bB8', 'gG69', 'cC(', 'uUvV', 'nNh', 'eEc'];

/**
 * Variants of a misread name, best first.
 *
 * Scryfall's fuzzy match is good but not magic: it resolves "Cultivate" and
 * refuses "Cultlvate", a single character out. Global substitution can't fix
 * that — replacing every t/l/i in "Cultlvate" gives "Cutttvate". So this
 * generates single-position swaps as well, which is what actually rescues a
 * one-character misread.
 */
export function variants(name, limit = 12) {
  const out = [name];
  const push = (v) => {
    if (v && v !== name && !out.includes(v) && out.length < limit) out.push(v);
  };

  // Digits inside a word are nearly always a misread letter. Whole-string
  // first, since a scan that mangles one digit usually mangles them all.
  push(name.replace(/(?<=[A-Za-z])\d|\d(?=[A-Za-z])/g, (d) => DIGIT_TO_LETTER[d] || d));
  push(name.replace(/^\d/, (d) => DIGIT_TO_LETTER[d] || d));
  push(name.replace(/rn/g, 'm'));

  // Single-position swaps, interior letters only — the first letter of a word
  // is read correctly far more often.
  //
  // Round-robin by rank rather than position: try every position's most likely
  // swap before any position's second. Walking positions left to right instead
  // spent the whole budget on the first three characters, which is why
  // "Cultlvate" never reached the one swap that fixes it.
  const slots = [];
  for (let i = 1; i < name.length; i++) {
    const ch = name[i];
    if (!/[A-Za-z0-9]/.test(ch) || name[i - 1] === ' ') continue;
    const cls = SWAP_CLASSES.find((c) => c.includes(ch));
    if (cls) slots.push({ i, ch, alts: [...cls].filter((a) => a !== ch) });
  }
  const deepest = Math.max(0, ...slots.map((s) => s.alts.length));
  for (let rank = 0; rank < deepest && out.length < limit; rank++) {
    for (const slot of slots) {
      const alt = slot.alts[rank];
      if (!alt) continue;
      const cased = slot.ch === slot.ch.toLowerCase() ? alt.toLowerCase() : alt.toUpperCase();
      push(name.slice(0, slot.i) + cased + name.slice(slot.i + 1));
      if (out.length >= limit) break;
    }
  }
  return out;
}

// --- resolution -------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Scryfall rejects requests with a default library User-Agent. A WebView
// supplies its own so this is belt-and-braces there, but it matters for any
// non-browser caller (and for the test harness).
const HEADERS = { Accept: 'application/json', 'User-Agent': 'TokenQueen/2.0 (card scanner)' };

async function getJson(url) {
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) return null;
  const j = await r.json();
  return j && j.object === 'error' ? null : j;
}

/**
 * Resolve OCR output to a card.
 * Returns { card, confidence, via, alternatives } or null.
 */
export async function identify(lines, opts = {}) {
  const { imageHeight, minConfidence = 0.62 } = opts;

  // 1. Exact printing, if the collector line is legible.
  const candidates = nameCandidates(lines, { imageHeight });

  const printing = findPrinting(lines);
  if (printing) {
    const card = await getJson(`${SCRYFALL}/cards/${printing.set}/${printing.number}`);
    await sleep(110);
    if (card) {
      // Only trust it if the name we read agrees. A single misread digit
      // otherwise hands back a different card at full confidence.
      const agreement = candidates.length
        ? Math.max(...candidates.map((c) => similarity(c.text, card.name)))
        : 0;
      if (!candidates.length || agreement >= 0.55) {
        return {
          card,
          confidence: candidates.length ? Math.max(0.9, agreement) : 0.8,
          via: 'collector-number',
          uncertain: !candidates.length,
          alternatives: [],
        };
      }
      // Disagreement: fall through to the name, which is the better signal.
    }
  }

  // 2. The name.
  const results = [];
  for (const cand of candidates.slice(0, 3)) {
    for (const v of variants(cand.text, 12)) {
      const card = await getJson(`${SCRYFALL}/cards/named?fuzzy=${encodeURIComponent(v)}`);
      await sleep(110);
      if (!card) continue;
      const conf = similarity(cand.text, card.name);
      results.push({ card, confidence: conf, via: 'name', matched: cand.text });
      if (conf > 0.95) break;
    }
    if (results.some((r) => r.confidence > 0.95)) break;
  }

  if (!results.length) return null;
  results.sort((a, b) => b.confidence - a.confidence);
  const best = results[0];
  if (best.confidence < minConfidence) {
    // Still worth showing — the user can confirm rather than being told no.
    return { ...best, uncertain: true, alternatives: results.slice(1, 4) };
  }
  return { ...best, alternatives: results.slice(1, 4).filter((r) => r.card.id !== best.card.id) };
}

// ---------------------------------------------------------------------------
// Multi-card scanning
// ---------------------------------------------------------------------------
/**
 * Split OCR output from a photo of several fanned cards into per-card bands.
 *
 * When you fan a pile, all you see of each card is its title bar, so the page
 * is a stack of name-height bands separated by gaps. Cluster the lines by
 * vertical position and each cluster is one card.
 *
 * Needs bounding boxes; without geometry there's no way to tell two cards from
 * two lines of the same card, so this returns a single band and lets the
 * caller fall back to single-card mode.
 */
export function nameBands(lines, { gapFactor = 0.9 } = {}) {
  const boxed = lines
    .map((l) => (typeof l === 'string' ? { text: l } : l))
    .filter((l) => l.box && l.box.height)
    .map((l) => ({ ...l, text: normaliseLine(l.text) }))
    .filter((l) => l.text && !NOT_A_NAME.some((re) => re.test(l.text)))
    .sort((a, b) => a.box.y - b.box.y);

  if (boxed.length < 2) return [lines];

  // Typical line height sets the scale for what counts as a gap between cards.
  const heights = boxed.map((l) => l.box.height).sort((a, b) => a - b);
  const median = heights[Math.floor(heights.length / 2)];
  const threshold = median * (1 + gapFactor);

  const bands = [[boxed[0]]];
  for (let i = 1; i < boxed.length; i++) {
    const prev = boxed[i - 1];
    const gap = boxed[i].box.y - (prev.box.y + prev.box.height);
    if (gap > threshold) bands.push([boxed[i]]);
    else bands[bands.length - 1].push(boxed[i]);
  }
  return bands;
}

/**
 * Identify several cards from one photo of a fanned pile.
 * Returns results in the order they appear down the page.
 */
export async function identifyMany(lines, opts = {}) {
  const bands = nameBands(lines, opts);
  const out = [];
  for (const band of bands) {
    // Inside a band there's no useful vertical signal, so score on text alone.
    const stripped = band.map((l) => (typeof l === 'string' ? l : l.text));
    const result = await identify(stripped, { ...opts, imageHeight: undefined });
    if (result) out.push(result);
  }
  return out;
}
