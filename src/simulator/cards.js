/**
 * Decklist parsing and card classification.
 *
 * parseList() takes raw text from a Mythic Tools export, a scan, or a pasted
 * list. classify() turns a Scryfall card object into the handful of facts the
 * engine needs — deliberately shallow: can I cast this, does it make mana,
 * does it draw cards.
 */

const SKIP_SECTION = /sideboard|maybe|considering|wishlist|token|sticker|attraction|buy\s*list|cut|leftover|pool|acquire/i;
const COMMANDER_SECTION = /commander|general|partner|companion/i;
const LINE = /^\s*(?:[-*+]\s*)?(\d+)\s*(?:[xX]\s|\s)\s*(.+?)\s*$/;
const SET_TAIL = /\s*(?:\([^)]{2,6}\)|\[[^\]]{2,6}\])\s*[\w\-*]*\s*$/;
const FOIL_TAIL = /\s*\*[FEfe]\*\s*$/;
const SB_PREFIX = /^(SB|MB|SIDEBOARD|MAYBEBOARD)\s*[:\-]\s*/i;
const DECK_HDR = /^\s*(?:[#=\-*]*\s*)?(?:deck|decklist)\s*[:=]\s*(.+?)\s*[#=\-*]*$/i;

export function cleanName(name) {
  let n = String(name).trim().replace(/^"|"$/g, '').trim();
  n = n.replace(FOIL_TAIL, '').replace(SET_TAIL, '');
  n = n.split('|')[0].trim();
  if (n.includes('//')) n = n.split('//')[0].trim();
  return n.replace(/[,;]+$/, '').trim();
}

/** Parse one decklist. Returns { commanders, entries: [{qty, name}] }. */
export function parseList(text) {
  const entries = [];
  const commanders = [];
  let mode = 'deck';

  for (const raw of String(text).split('\n')) {
    const line = raw.trim();
    if (!line || SB_PREFIX.test(line)) continue;

    if (!LINE.test(line)) {
      const bare = line.replace(/^[#/*\-= ]+/, '').trim();
      if (SKIP_SECTION.test(bare)) mode = 'skip';
      else if (COMMANDER_SECTION.test(bare)) mode = 'commander';
      else if (bare) mode = 'deck';
      continue;
    }

    let l = line;
    if (l.startsWith('#') || l.startsWith('//')) l = l.replace(/^[#/ ]+/, '').trim();
    const m = LINE.exec(l);
    if (!m) continue;

    const qty = parseInt(m[1], 10);
    const name = cleanName(m[2]);
    if (!name || /^\d+$/.test(name) || mode === 'skip') continue;
    if (mode === 'commander') for (let k = 0; k < qty; k++) commanders.push(name);
    else entries.push({ qty, name });
  }
  return { commanders, entries };
}

/** Split an export holding several decks. Returns [{name, commanders, entries}]. */
export function parseMulti(text) {
  const decks = [];
  let name = null, commanders = [], entries = [], mode = 'deck';
  const flush = () => { if (entries.length) decks.push({ name, commanders, entries }); };

  for (const raw of String(text).split('\n')) {
    const line = raw.trim();
    if (!line || SB_PREFIX.test(line)) continue;

    if (!LINE.test(line)) {
      const bare = line.replace(/^[#/*\-= ]+/, '').trim();
      const hdr = DECK_HDR.exec(line);
      const explicit = hdr && !COMMANDER_SECTION.test(hdr[1]) && !SKIP_SECTION.test(hdr[1]);
      if (explicit || (COMMANDER_SECTION.test(bare) && entries.length)) {
        flush();
        commanders = []; entries = [];
        name = explicit ? hdr[1].trim() : null;
        mode = explicit ? 'deck' : 'commander';
        continue;
      }
      if (SKIP_SECTION.test(bare)) mode = 'skip';
      else if (COMMANDER_SECTION.test(bare)) mode = 'commander';
      else if (bare) mode = 'deck';
      continue;
    }

    let l = line;
    if (l.startsWith('#') || l.startsWith('//')) l = l.replace(/^[#/ ]+/, '').trim();
    const m = LINE.exec(l);
    if (!m) continue;
    const qty = parseInt(m[1], 10);
    const cname = cleanName(m[2]);
    if (!cname || /^\d+$/.test(cname) || mode === 'skip') continue;
    if (mode === 'commander') for (let k = 0; k < qty; k++) commanders.push(cname);
    else entries.push({ qty, name: cname });
  }
  flush();
  return decks.length ? decks : [{ name: null, ...parseList(text) }];
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------
const PIP = /\{([^}]+)\}/g;
const ENTERS_TAPPED = /enters (?:the battlefield )?tapped/i;
const UNLESS = /enters (?:the battlefield )?tapped unless/i;
const ADDS_MANA = /\badd\s*\{/i;
const BASIC_FETCH = /search your library for a basic land/i;
const FETCH_LAND = /search your library for (?:a|up to \w+|one|two|[^.]*?)\b[^.]*?\bland[^.]*?(?:onto the battlefield|put (?:it|them) onto the battlefield)/i;
const FETCH_HAND = /search your library for[^.]*?\bland[^.]*?put it into your hand/i;
const DRAW = /draw (a|one|two|three|four|five|\w+) cards?/i;
const SPOT_REMOVAL = /(destroy target (?:creature|permanent|nonland)|exile target (?:creature|permanent|nonland)|target creature gets -|deals \d+ damage to target creature)/i;
const WIPE = /(destroy all (?:creatures|nonland permanents)|exile all (?:creatures|nonland permanents)|all creatures get -|deals \d+ damage to each creature)/i;
const WORDNUM = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7 };

export function parseCost(manaCost) {
  let generic = 0;
  const pips = {};
  const syms = String(manaCost || '').match(PIP) || [];
  for (const raw of syms) {
    const s = raw.slice(1, -1).toUpperCase();
    if (/^\d+$/.test(s)) generic += parseInt(s, 10);
    else if (s === 'X' || s === 'Y' || s === 'Z') continue;
    else if (s === 'C') generic += 1;
    else if (s.includes('/')) {
      const parts = s.split('/').filter((p) => 'WUBRG'.includes(p));
      if (parts.length) pips[parts[0]] = (pips[parts[0]] || 0) + 1;
      else generic += 1;
    } else if ('WUBRG'.includes(s)) pips[s] = (pips[s] || 0) + 1;
    else generic += 1;
  }
  return { generic, pips };
}

/** Scryfall card object -> engine card. Pass null for an unknown name. */
export function classify(name, card) {
  if (!card) return { name, unknown: true, mv: 3, generic: 3, pips: {}, types: '', isLand: false, produces: [], ramp: 0, draw: 0 };

  const faces = card.card_faces || [card];
  const front = card.card_faces && !card.mana_cost ? card.card_faces[0] : card;
  const oracle = faces.map((f) => f.oracle_text || '').join(' ') || card.oracle_text || '';
  const types = card.type_line || front.type_line || '';
  const { generic, pips } = parseCost(front.mana_cost || '');

  const c = {
    name: card.name || name,
    mv: Math.round(card.cmc || 0),
    generic, pips, types,
    isLand: types.includes('Land'),
    produces: (card.produced_mana || []).filter((x) => 'WUBRG'.includes(x)),
    entersTapped: false,
    tappedConditional: false,
    ramp: 0, rampKind: '', draw: 0,
    removal: SPOT_REMOVAL.test(oracle),
    wipe: WIPE.test(oracle),
    unknown: false,
  };

  if (c.isLand) {
    c.entersTapped = ENTERS_TAPPED.test(oracle) && !UNLESS.test(oracle);
    c.tappedConditional = UNLESS.test(oracle);
    if (!c.produces.length && BASIC_FETCH.test(oracle)) c.produces = 'FETCH';
    return c;
  }

  const addMatch = ADDS_MANA.exec(oracle);
  if (addMatch) {
    const tail = oracle.slice(addMatch.index, addMatch.index + 40);
    const syms = tail.match(PIP) || [];
    let amount = 0;
    for (const raw of syms.slice(0, 3)) {
      const s = raw.slice(1, -1);
      amount += /^\d+$/.test(s) ? parseInt(s, 10) : 1;
    }
    c.ramp = Math.max(1, Math.min(amount, 3));
    c.rampKind = types.includes('Creature') ? 'dork' : 'rock';
  } else if (FETCH_LAND.test(oracle) || FETCH_HAND.test(oracle)) {
    c.ramp = 1;
    c.rampKind = 'land';
  }

  const d = DRAW.exec(oracle);
  if (d) c.draw = WORDNUM[d[1].toLowerCase()] || 1;
  return c;
}

/** Expand entries into the 99, resolve fetchlands, pull out the commander. */
export function buildDeck(entries, commanders, cardData) {
  const get = (n) => cardData[n.toLowerCase()] || null;
  const cmd = commanders.length ? classify(commanders[0], get(commanders[0])) : null;

  const deck = [];
  for (const { qty, name } of entries) {
    const base = classify(name, get(name));
    for (let k = 0; k < qty; k++) deck.push(base);
  }

  const ident = new Set();
  for (const c of deck) for (const k of Object.keys(c.pips)) ident.add(k);
  if (cmd) for (const k of Object.keys(cmd.pips)) ident.add(k);
  const identArr = [...ident];
  for (let i = 0; i < deck.length; i++) {
    if (deck[i].produces === 'FETCH') deck[i] = { ...deck[i], produces: identArr };
  }

  if (cmd) {
    const at = deck.findIndex((c) => c.name === cmd.name);
    if (at >= 0) deck.splice(at, 1);
  }
  return { deck, commander: cmd };
}
