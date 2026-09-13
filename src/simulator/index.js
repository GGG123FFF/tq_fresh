/** Public surface for the simulator. One import for the app. */
export { parseList, parseMulti, classify, buildDeck, cleanName } from './cards.js';
export { resolve, memoryStore } from './scryfall.js';
export { run, runChunked, CompiledDeck, mulberry32 } from './engine.js';
export { summarise, deterministic, karstenFlags, consistencyScore } from './report.js';

import { parseList, buildDeck } from './cards.js';
import { resolve } from './scryfall.js';
import { run, runChunked, CompiledDeck } from './engine.js';
import { summarise } from './report.js';

/**
 * One call, raw text in, summary out. This is what the Simulator tab uses.
 */
export async function simulate(text, opts = {}) {
  const { commanders: parsedCmd, entries } = parseList(text);
  if (!entries.length) throw new Error('No cards found in that list.');

  let commanders = opts.commander ? [opts.commander] : parsedCmd;
  const names = [...new Set([...entries.map((e) => e.name), ...commanders])];
  const { data, misses, fuzzy } = await resolve(names, opts);

  const canon = (n) => (data[n.toLowerCase()] ? data[n.toLowerCase()].name : n);
  const canonEntries = entries.map((e) => ({ qty: e.qty, name: canon(e.name) }));
  commanders = commanders.map(canon);

  if (!commanders.length) {
    for (const e of canonEntries) {
      const c = data[e.name.toLowerCase()];
      if (c && /Legendary/.test(c.type_line || '') && /Creature/.test(c.type_line || '')) {
        commanders = [c.name];
        break;
      }
    }
  }

  const { deck, commander } = buildDeck(canonEntries, commanders, data);
  const compiled = new CompiledDeck(deck, commander);
  const results = opts.onProgress
    ? await runChunked(deck, commander, { ...opts, deck: compiled })
    : run(deck, commander, { ...opts, deck: compiled });

  const s = summarise(opts.name || commanders[0] || 'Deck', deck, commander, results);
  s.totalCards = canonEntries.reduce((a, e) => a + e.qty, 0) + commanders.length;
  s.unresolved = misses;
  s.fuzzyCorrections = fuzzy;
  s.guessedCommander = !parsedCmd.length && !opts.commander && !!commanders.length;
  return s;
}
