/**
 * Scryfall lookup with a pluggable cache.
 *
 * On device, pass a store backed by Capacitor Preferences or IndexedDB — once
 * a card is cached the simulator never needs the network again, which matters
 * because this runs on a phone that may be offline at a kitchen table.
 */

const COLLECTION_URL = 'https://api.scryfall.com/cards/collection';
const NAMED_URL = 'https://api.scryfall.com/cards/named';
const HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Simple in-memory store; swap for a persistent one in the app. */
export function memoryStore() {
  const m = new Map();
  return {
    get: async (k) => m.get(k),
    set: async (k, v) => { m.set(k, v); },
    keys: async () => [...m.keys()],
  };
}

function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function similarity(a, b) {
  a = norm(a); b = norm(b);
  if (!a || !b) return 0;
  if (a === b) return 1;
  // Dice coefficient over bigrams — cheap and good enough to reject nonsense.
  const grams = (s) => { const g = new Map(); for (let i = 0; i < s.length - 1; i++) { const k = s.slice(i, i + 2); g.set(k, (g.get(k) || 0) + 1); } return g; };
  const ga = grams(a), gb = grams(b);
  let hits = 0;
  for (const [k, v] of ga) if (gb.has(k)) hits += Math.min(v, gb.get(k));
  const total = (a.length - 1) + (b.length - 1);
  return total ? (2 * hits) / total : 0;
}

/**
 * Resolve names to Scryfall cards.
 * Returns { data, misses, fuzzy } — data keyed by lowercased asked-for name.
 */
export async function resolve(names, { store, offline = false, onProgress } = {}) {
  const cache = store || memoryStore();
  const data = {};
  const need = [];

  for (const n of names) {
    const hit = await cache.get(n.toLowerCase());
    if (hit) data[n.toLowerCase()] = hit;
    else need.push(n);
  }
  if (!need.length || offline) return { data, misses: offline ? need : [], fuzzy: {} };

  let misses = [];
  for (let i = 0; i < need.length; i += 75) {
    const chunk = need.slice(i, i + 75);
    try {
      const r = await fetch(COLLECTION_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ identifiers: chunk.map((n) => ({ name: n })) }),
      });
      if (!r.ok) throw new Error(`Scryfall ${r.status}`);
      const body = await r.json();
      for (const card of body.data || []) {
        await cache.set(card.name.toLowerCase(), card);
        data[card.name.toLowerCase()] = card;
        for (const asked of chunk) {
          if (card.name.toLowerCase().includes(asked.toLowerCase())) {
            await cache.set(asked.toLowerCase(), card);
            data[asked.toLowerCase()] = card;
          }
        }
      }
    } catch (err) {
      misses.push(...chunk);
      continue;
    }
    if (onProgress) onProgress(Math.min(i + 75, need.length), need.length);
    await sleep(120);
  }

  misses = [...new Set([...misses, ...need.filter((n) => !data[n.toLowerCase()])])];

  // Fuzzy second pass for scanner misreads, guarded by a similarity floor so
  // we reject a wrong guess rather than silently swapping in the wrong card.
  const fuzzy = {};
  const stillMissing = [];
  for (const n of misses) {
    try {
      const r = await fetch(`${NAMED_URL}?fuzzy=${encodeURIComponent(n)}`);
      await sleep(120);
      if (!r.ok) { stillMissing.push(n); continue; }
      const card = await r.json();
      if (card.object !== 'card') { stillMissing.push(n); continue; }
      const ratio = similarity(n, card.name);
      if (ratio < 0.72) { stillMissing.push(n); continue; }
      await cache.set(n.toLowerCase(), card);
      await cache.set(card.name.toLowerCase(), card);
      data[n.toLowerCase()] = card;
      fuzzy[n] = { name: card.name, ratio: Math.round(ratio * 100) / 100 };
    } catch { stillMissing.push(n); }
  }
  return { data, misses: stillMissing, fuzzy };
}
