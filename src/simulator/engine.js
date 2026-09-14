/**
 * Goldfish simulator — on-device engine.
 *
 * Port of the Python version: the deck is compiled once into typed arrays,
 * mana is bitmasks, the pool is a vector of counts per distinct source type,
 * and every (cost, pool) payment question is memoised. Runs entirely offline
 * once card data is cached — no server.
 *
 * Measures consistency, never power.
 */

export const COLOURS = 'WUBRG';
export const BIT = { W: 1, U: 2, B: 4, R: 8, G: 16 };
export const MAX_TURNS = 10;

const TAP_NO = 0, TAP_ALWAYS = 1, TAP_COND = 2;
const POPCOUNT = Array.from({ length: 32 }, (_, i) => i.toString(2).split('1').length - 1);

/** Deterministic RNG so a given deck + seed always reproduces. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Payment solver
// ---------------------------------------------------------------------------
class Solver {
  constructor(masks) {
    this.masks = masks;
    this.flex = masks.map((m) => POPCOUNT[m]);
    this.subsetTypes = [];
    for (let s = 0; s < 32; s++) {
      const list = [];
      for (let t = 0; t < masks.length; t++) if (masks[t] & s) list.push(t);
      this.subsetTypes.push(list);
    }
    this.memo = new Map();
  }

  /** Hall's condition across all 31 non-empty colour subsets. */
  feasible(demand, pool) {
    for (let s = 1; s < 32; s++) {
      let need = 0, b = s;
      while (b) { const low = b & -b; need += demand[low] || 0; b ^= low; }
      if (!need) continue;
      let cap = 0;
      const types = this.subsetTypes[s];
      for (let i = 0; i < types.length; i++) cap += pool[types[i]];
      if (need > cap) return false;
    }
    return true;
  }

  pay(costKey, cost, pool, poolKey) {
    const key = costKey + '|' + poolKey;
    const hit = this.memo.get(key);
    if (hit !== undefined) return hit;
    const res = this._pay(cost, pool);
    this.memo.set(key, res);
    return res;
  }

  _pay(cost, pool) {
    let generic = cost.generic;
    let total = 0;
    for (let i = 0; i < pool.length; i++) total += pool[i];

    const demand = {};
    let need = generic;
    for (const [bit, n] of cost.pips) { demand[bit] = (demand[bit] || 0) + n; need += n; }
    if (total < need) return null;

    const bits = Object.keys(demand).map(Number);
    if (bits.length && !this.feasible(demand, pool)) return null;

    const left = pool.slice();
    const spend = new Array(pool.length).fill(0);

    // Most constrained colour first, least flexible source first, re-checking
    // feasibility after each unit so we never paint ourselves into a corner.
    bits.sort((a, b) => {
      const ca = this.subsetTypes[a].reduce((s, t) => s + left[t], 0);
      const cb = this.subsetTypes[b].reduce((s, t) => s + left[t], 0);
      return ca - cb;
    });

    for (const bit of bits) {
      while (demand[bit] > 0) {
        const cands = this.subsetTypes[bit]
          .filter((t) => left[t] > 0)
          .sort((a, b) => this.flex[a] - this.flex[b]);
        let placed = false;
        for (const t of cands) {
          left[t] -= 1; demand[bit] -= 1;
          const rest = {};
          let any = false;
          for (const k of Object.keys(demand)) if (demand[k] > 0) { rest[k] = demand[k]; any = true; }
          if (!any || this.feasible(rest, left)) { spend[t] += 1; placed = true; break; }
          left[t] += 1; demand[bit] += 1;
        }
        if (!placed) return null;
      }
    }

    if (generic) {
      const order = left.map((_, t) => t).sort((a, b) => this.flex[a] - this.flex[b]);
      for (const t of order) {
        const take = Math.min(generic, left[t]);
        left[t] -= take; spend[t] += take; generic -= take;
        if (!generic) break;
      }
      if (generic) return null;
    }
    return spend;
  }
}

// ---------------------------------------------------------------------------
// Compiled deck
// ---------------------------------------------------------------------------
function maskOf(produces) {
  let m = 0;
  for (const c of produces || []) m |= BIT[c] || 0;
  return m;
}

function costOf(card) {
  if (!card) return null;
  const pips = Object.entries(card.pips || {})
    .filter(([k]) => BIT[k])
    .map(([k, v]) => [BIT[k], v])
    .sort((a, b) => a[0] - b[0]);
  return {
    generic: card.generic || 0,
    pips,
    key: `${card.generic || 0}:${pips.map(([b, n]) => b + 'x' + n).join(',')}`,
  };
}

export class CompiledDeck {
  constructor(cards, commander) {
    const maskSet = new Set();
    for (const c of cards.concat(commander ? [commander] : [])) {
      if (c && (c.isLand || c.ramp)) maskSet.add(maskOf(c.produces));
    }
    if (!maskSet.size) maskSet.add(0);
    this.masks = [...maskSet].sort((a, b) => a - b);
    const index = new Map(this.masks.map((m, i) => [m, i]));
    this.solver = new Solver(this.masks);
    this.ntypes = this.masks.length;

    const n = cards.length;
    this.n = n;
    this.isLand = new Uint8Array(n);
    this.src = new Int16Array(n);
    this.tap = new Uint8Array(n);
    this.mv = new Int16Array(n);
    this.ramp = new Int16Array(n);
    this.rampSrc = new Int16Array(n);
    this.draw = new Int16Array(n);
    this.prodMask = new Int16Array(n);
    this.cost = new Array(n);

    cards.forEach((c, i) => {
      const m = maskOf(c.produces);
      this.prodMask[i] = m;
      this.mv[i] = c.mv || 0;
      this.cost[i] = costOf(c);
      this.draw[i] = c.draw || 0;
      if (c.isLand) {
        this.isLand[i] = 1;
        this.src[i] = index.get(m);
        this.tap[i] = c.entersTapped ? TAP_ALWAYS : c.tappedConditional ? TAP_COND : TAP_NO;
      } else if (c.ramp) {
        this.ramp[i] = c.ramp;
        this.rampSrc[i] = index.get(m);
      }
    });

    this.cmdCost = commander ? costOf(commander) : null;
    this.cmdMv = commander ? commander.mv : 0;
    this.hasCmd = !!commander;
    this.scratch = Array.from({ length: n }, (_, i) => i);
  }
}

// ---------------------------------------------------------------------------
// One game
// ---------------------------------------------------------------------------
function bottomCards(hand, n, D) {
  const lands = hand.filter((i) => D.isLand[i]).sort((a, b) => D.tap[b] - D.tap[a]);
  const spells = hand.filter((i) => !D.isLand[i]).sort((a, b) => D.mv[b] - D.mv[a]);
  for (let k = 0; k < n; k++) {
    if (lands.length > 3) lands.shift();
    else if (spells.length) spells.shift();
    else if (lands.length) lands.shift();
  }
  return lands.concat(spells);
}

function partialShuffle(order, k, rnd) {
  const n = order.length;
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(rnd() * (n - i));
    const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
  }
}

export function playOne(D, rnd, opts) {
  const { onPlay = true, minLands = 2, maxLands = 5 } = opts || {};
  const res = {
    mulligans: 0, keptLands: 0, landsByTurn: [], manaAvailable: [], manaSpent: [],
    commanderTurn: null, colourScrewTurns: 0, stuckOnLands: false, flooded: false,
    cardsCast: 0, seen: 0, landsSeen: 0,
  };

  const order = D.scratch;
  let hand = [], library = [];
  for (let mull = 0; mull < 4; mull++) {
    partialShuffle(order, 34, rnd);
    hand = order.slice(0, 7);
    library = order.slice(7);
    const size = 7 - mull;
    let lands = 0, hasRamp = false, castable = 0, cheap = 0;
    for (const i of hand) {
      if (D.isLand[i]) { lands++; continue; }
      if (D.ramp[i] && D.mv[i] <= 3) hasRamp = true;
      // Roughly: could this be cast off the lands in hand plus a couple of
      // draws? Counting lands alone kept seven-lands-and-a-six-drop, which is
      // a mulligan in any real game and was the engine's biggest optimism.
      if (D.mv[i] <= lands + 2) castable++;
      if (D.mv[i] <= 3) cheap++;
    }
    const lo = Math.max(1, minLands - Math.floor((7 - size) / 2));
    const landsOk = lo <= lands + (hasRamp ? 1 : 0) && lands <= maxLands;
    // A hand also needs something to do with the mana. On six or fewer we
    // relax this, because at that point you keep and hope.
    const hasPlan = size <= 6 ? castable >= 1 : (castable >= 1 && cheap >= 1);
    if (mull === 3 || (landsOk && hasPlan)) {
      if (mull) hand = bottomCards(hand, mull, D);
      res.mulligans = mull;
      break;
    }
  }

  res.keptLands = hand.filter((i) => D.isLand[i]).length;
  res.seen = hand.length;
  res.landsSeen = res.keptLands;

  const perm = new Array(D.ntypes).fill(0);
  let pool = new Array(D.ntypes).fill(0);
  let pending = [];
  let haveMask = 0;
  let cmdCast = !D.hasCmd;
  let nlands = 0, li = 0;
  const nlib = library.length;

  const drawCard = () => {
    if (li >= nlib) return;
    const c = library[li++];
    hand.push(c);
    res.seen++;
    if (D.isLand[c]) res.landsSeen++;
  };

  for (let turn = 1; turn <= MAX_TURNS; turn++) {
    if (!(turn === 1 && onPlay)) drawCard();

    for (const [t, amt] of pending) perm[t] += amt;
    pending = [];
    pool = perm.slice(); // untap step

    // --- land drop ---
    let needMask = 0;
    for (const i of hand) if (!D.isLand[i]) for (const [b] of D.cost[i].pips) needMask |= b;
    needMask &= ~haveMask;

    let best = null, bestKey = null;
    for (const i of hand) {
      if (!D.isLand[i]) continue;
      const late = D.tap[i] === TAP_ALWAYS || (D.tap[i] === TAP_COND && turn <= 3);
      const key = [-POPCOUNT[D.prodMask[i] & needMask],
        late && turn <= 4 ? 1 : 0,
        -POPCOUNT[D.prodMask[i]]];
      if (!bestKey || cmpKey(key, bestKey) < 0) { bestKey = key; best = i; }
    }
    if (best !== null) {
      hand.splice(hand.indexOf(best), 1);
      haveMask |= D.prodMask[best];
      nlands++;
      if (D.tap[best] === TAP_ALWAYS || (D.tap[best] === TAP_COND && turn <= 3)) {
        pending.push([D.src[best], 1]);
      } else {
        perm[D.src[best]] += 1;
        pool[D.src[best]] += 1;
      }
    }
    res.landsByTurn.push(nlands);

    let free = 0;
    for (let t = 0; t < pool.length; t++) free += pool[t];
    res.manaAvailable.push(free);

    let spent = 0, screwed = false;

    // Commander first — in practice you cast it the turn you can.
    if (!cmdCast) {
      const sp = D.solver.pay(D.cmdCost.key, D.cmdCost, pool, pool.join(','));
      if (sp) {
        for (let t = 0; t < sp.length; t++) { pool[t] -= sp[t]; free -= sp[t]; }
        spent += D.cmdMv;
        cmdCast = true;
        res.commanderTurn = turn;
      }
    }

    // Greedy cast: ramp first while it still compounds, then biggest.
    for (;;) {
      if (!free) break;
      const poolKey = pool.join(',');
      let pick = null, pickKey = null, pickSp = null;
      for (const i of hand) {
        if (D.isLand[i]) continue;
        const sp = D.solver.pay(D.cost[i].key, D.cost[i], pool, poolKey);
        if (!sp) continue;
        const key = [D.ramp[i] && turn <= 5 ? 0 : 1, -D.mv[i]];
        if (!pickKey || cmpKey(key, pickKey) < 0) { pickKey = key; pick = i; pickSp = sp; }
      }
      if (pick === null) {
        for (const i of hand) if (!D.isLand[i] && D.mv[i] <= free) { screwed = true; break; }
        break;
      }
      for (let t = 0; t < pickSp.length; t++) { pool[t] -= pickSp[t]; free -= pickSp[t]; }
      hand.splice(hand.indexOf(pick), 1);
      spent += D.mv[pick];
      res.cardsCast++;
      if (D.ramp[pick]) pending.push([D.rampSrc[pick], D.ramp[pick]]);
      for (let k = 0; k < D.draw[pick]; k++) drawCard();
    }

    res.manaSpent.push(spent);
    if (screwed) res.colourScrewTurns++;
  }

  res.stuckOnLands = res.landsByTurn[3] < 3;
  res.flooded = res.seen >= 10 && res.landsSeen / res.seen > 0.52;
  return res;
}

function cmpKey(a, b) {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
}

/**
 * Run N games. Yields progress via onProgress(done, total) so the UI can stay
 * responsive — call from a worker or chunk it with requestIdleCallback.
 */
export function run(cards, commander, opts = {}) {
  const { games = 10000, seed = 1234 } = opts;
  const D = opts.deck || new CompiledDeck(cards, commander);
  const rnd = mulberry32(seed);
  const out = new Array(games);
  for (let g = 0; g < games; g++) out[g] = playOne(D, rnd, opts);
  return out;
}

/**
 * Chunked run that yields to the event loop so the UI stays responsive.
 * A 20k-game run is well under a second, but on a mid-range phone that is
 * still long enough to drop frames if you block the thread.
 */
export async function runChunked(cards, commander, opts = {}) {
  const { games = 10000, seed = 1234, chunk = 1000, onProgress } = opts;
  const D = opts.deck || new CompiledDeck(cards, commander);
  const rnd = mulberry32(seed);
  const out = new Array(games);
  for (let g = 0; g < games; g++) {
    out[g] = playOne(D, rnd, opts);
    if ((g + 1) % chunk === 0) {
      if (onProgress) onProgress(g + 1, games);
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  if (onProgress) onProgress(games, games);
  return out;
}
