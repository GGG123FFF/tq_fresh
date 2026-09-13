(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/simulator/cards.js
  var SKIP_SECTION = /sideboard|maybe|considering|wishlist|token|sticker|attraction|buy\s*list|cut|leftover|pool|acquire/i;
  var COMMANDER_SECTION = /commander|general|partner|companion/i;
  var LINE = /^\s*(?:[-*+]\s*)?(\d+)\s*(?:[xX]\s|\s)\s*(.+?)\s*$/;
  var SET_TAIL = /\s*(?:\([^)]{2,6}\)|\[[^\]]{2,6}\])\s*[\w\-*]*\s*$/;
  var FOIL_TAIL = /\s*\*[FEfe]\*\s*$/;
  var SB_PREFIX = /^(SB|MB|SIDEBOARD|MAYBEBOARD)\s*[:\-]\s*/i;
  function cleanName(name) {
    let n = String(name).trim().replace(/^"|"$/g, "").trim();
    n = n.replace(FOIL_TAIL, "").replace(SET_TAIL, "");
    n = n.split("|")[0].trim();
    if (n.includes("//")) n = n.split("//")[0].trim();
    return n.replace(/[,;]+$/, "").trim();
  }
  function parseList(text) {
    const entries = [];
    const commanders = [];
    let mode = "deck";
    for (const raw of String(text).split("\n")) {
      const line = raw.trim();
      if (!line || SB_PREFIX.test(line)) continue;
      if (!LINE.test(line)) {
        const bare = line.replace(/^[#/*\-= ]+/, "").trim();
        if (SKIP_SECTION.test(bare)) mode = "skip";
        else if (COMMANDER_SECTION.test(bare)) mode = "commander";
        else if (bare) mode = "deck";
        continue;
      }
      let l = line;
      if (l.startsWith("#") || l.startsWith("//")) l = l.replace(/^[#/ ]+/, "").trim();
      const m = LINE.exec(l);
      if (!m) continue;
      const qty = parseInt(m[1], 10);
      const name = cleanName(m[2]);
      if (!name || /^\d+$/.test(name) || mode === "skip") continue;
      if (mode === "commander") for (let k = 0; k < qty; k++) commanders.push(name);
      else entries.push({ qty, name });
    }
    return { commanders, entries };
  }
  var PIP = /\{([^}]+)\}/g;
  var ENTERS_TAPPED = /enters (?:the battlefield )?tapped/i;
  var UNLESS = /enters (?:the battlefield )?tapped unless/i;
  var ADDS_MANA = /\badd\s*\{/i;
  var BASIC_FETCH = /search your library for a basic land/i;
  var FETCH_LAND = /search your library for (?:a|up to \w+|one|two|[^.]*?)\b[^.]*?\bland[^.]*?(?:onto the battlefield|put (?:it|them) onto the battlefield)/i;
  var FETCH_HAND = /search your library for[^.]*?\bland[^.]*?put it into your hand/i;
  var DRAW = /draw (a|one|two|three|four|five|\w+) cards?/i;
  var SPOT_REMOVAL = /(destroy target (?:creature|permanent|nonland)|exile target (?:creature|permanent|nonland)|target creature gets -|deals \d+ damage to target creature)/i;
  var WIPE = /(destroy all (?:creatures|nonland permanents)|exile all (?:creatures|nonland permanents)|all creatures get -|deals \d+ damage to each creature)/i;
  var WORDNUM = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7 };
  function parseCost(manaCost) {
    let generic = 0;
    const pips = {};
    const syms = String(manaCost || "").match(PIP) || [];
    for (const raw of syms) {
      const s = raw.slice(1, -1).toUpperCase();
      if (/^\d+$/.test(s)) generic += parseInt(s, 10);
      else if (s === "X" || s === "Y" || s === "Z") continue;
      else if (s === "C") generic += 1;
      else if (s.includes("/")) {
        const parts = s.split("/").filter((p) => "WUBRG".includes(p));
        if (parts.length) pips[parts[0]] = (pips[parts[0]] || 0) + 1;
        else generic += 1;
      } else if ("WUBRG".includes(s)) pips[s] = (pips[s] || 0) + 1;
      else generic += 1;
    }
    return { generic, pips };
  }
  function classify(name, card) {
    if (!card) return { name, unknown: true, mv: 3, generic: 3, pips: {}, types: "", isLand: false, produces: [], ramp: 0, draw: 0 };
    const faces = card.card_faces || [card];
    const front = card.card_faces && !card.mana_cost ? card.card_faces[0] : card;
    const oracle = faces.map((f) => f.oracle_text || "").join(" ") || card.oracle_text || "";
    const types = card.type_line || front.type_line || "";
    const { generic, pips } = parseCost(front.mana_cost || "");
    const c = {
      name: card.name || name,
      mv: Math.round(card.cmc || 0),
      generic,
      pips,
      types,
      isLand: types.includes("Land"),
      produces: (card.produced_mana || []).filter((x) => "WUBRG".includes(x)),
      entersTapped: false,
      tappedConditional: false,
      ramp: 0,
      rampKind: "",
      draw: 0,
      removal: SPOT_REMOVAL.test(oracle),
      wipe: WIPE.test(oracle),
      unknown: false
    };
    if (c.isLand) {
      c.entersTapped = ENTERS_TAPPED.test(oracle) && !UNLESS.test(oracle);
      c.tappedConditional = UNLESS.test(oracle);
      if (!c.produces.length && BASIC_FETCH.test(oracle)) c.produces = "FETCH";
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
      c.rampKind = types.includes("Creature") ? "dork" : "rock";
    } else if (FETCH_LAND.test(oracle) || FETCH_HAND.test(oracle)) {
      c.ramp = 1;
      c.rampKind = "land";
    }
    const d = DRAW.exec(oracle);
    if (d) c.draw = WORDNUM[d[1].toLowerCase()] || 1;
    return c;
  }
  function buildDeck(entries, commanders, cardData) {
    const get = (n) => cardData[n.toLowerCase()] || null;
    const cmd = commanders.length ? classify(commanders[0], get(commanders[0])) : null;
    const deck = [];
    for (const { qty, name } of entries) {
      const base = classify(name, get(name));
      for (let k = 0; k < qty; k++) deck.push(base);
    }
    const ident = /* @__PURE__ */ new Set();
    for (const c of deck) for (const k of Object.keys(c.pips)) ident.add(k);
    if (cmd) for (const k of Object.keys(cmd.pips)) ident.add(k);
    const identArr = [...ident];
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].produces === "FETCH") deck[i] = __spreadProps(__spreadValues({}, deck[i]), { produces: identArr });
    }
    if (cmd) {
      const at = deck.findIndex((c) => c.name === cmd.name);
      if (at >= 0) deck.splice(at, 1);
    }
    return { deck, commander: cmd };
  }

  // src/simulator/scryfall.js
  var COLLECTION_URL = "https://api.scryfall.com/cards/collection";
  var NAMED_URL = "https://api.scryfall.com/cards/named";
  var HEADERS = { "Content-Type": "application/json", Accept: "application/json" };
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  function memoryStore() {
    const m = /* @__PURE__ */ new Map();
    return {
      get: async (k) => m.get(k),
      set: async (k, v) => {
        m.set(k, v);
      },
      keys: async () => [...m.keys()]
    };
  }
  function norm(s) {
    return s.toLowerCase().replace(/[^a-z0-9]/g, "");
  }
  function similarity(a, b) {
    a = norm(a);
    b = norm(b);
    if (!a || !b) return 0;
    if (a === b) return 1;
    const grams = (s) => {
      const g = /* @__PURE__ */ new Map();
      for (let i = 0; i < s.length - 1; i++) {
        const k = s.slice(i, i + 2);
        g.set(k, (g.get(k) || 0) + 1);
      }
      return g;
    };
    const ga = grams(a), gb = grams(b);
    let hits = 0;
    for (const [k, v] of ga) if (gb.has(k)) hits += Math.min(v, gb.get(k));
    const total = a.length - 1 + (b.length - 1);
    return total ? 2 * hits / total : 0;
  }
  async function resolve(names, { store, offline = false, onProgress } = {}) {
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
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({ identifiers: chunk.map((n) => ({ name: n })) })
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
    misses = [.../* @__PURE__ */ new Set([...misses, ...need.filter((n) => !data[n.toLowerCase()])])];
    const fuzzy = {};
    const stillMissing = [];
    for (const n of misses) {
      try {
        const r = await fetch(`${NAMED_URL}?fuzzy=${encodeURIComponent(n)}`);
        await sleep(120);
        if (!r.ok) {
          stillMissing.push(n);
          continue;
        }
        const card = await r.json();
        if (card.object !== "card") {
          stillMissing.push(n);
          continue;
        }
        const ratio = similarity(n, card.name);
        if (ratio < 0.72) {
          stillMissing.push(n);
          continue;
        }
        await cache.set(n.toLowerCase(), card);
        await cache.set(card.name.toLowerCase(), card);
        data[n.toLowerCase()] = card;
        fuzzy[n] = { name: card.name, ratio: Math.round(ratio * 100) / 100 };
      } catch (e) {
        stillMissing.push(n);
      }
    }
    return { data, misses: stillMissing, fuzzy };
  }

  // src/simulator/engine.js
  var BIT = { W: 1, U: 2, B: 4, R: 8, G: 16 };
  var MAX_TURNS = 10;
  var TAP_NO = 0;
  var TAP_ALWAYS = 1;
  var TAP_COND = 2;
  var POPCOUNT = Array.from({ length: 32 }, (_, i) => i.toString(2).split("1").length - 1);
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function() {
      a |= 0;
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var Solver = class {
    constructor(masks) {
      this.masks = masks;
      this.flex = masks.map((m) => POPCOUNT[m]);
      this.subsetTypes = [];
      for (let s = 0; s < 32; s++) {
        const list = [];
        for (let t = 0; t < masks.length; t++) if (masks[t] & s) list.push(t);
        this.subsetTypes.push(list);
      }
      this.memo = /* @__PURE__ */ new Map();
    }
    /** Hall's condition across all 31 non-empty colour subsets. */
    feasible(demand, pool) {
      for (let s = 1; s < 32; s++) {
        let need = 0, b = s;
        while (b) {
          const low = b & -b;
          need += demand[low] || 0;
          b ^= low;
        }
        if (!need) continue;
        let cap = 0;
        const types = this.subsetTypes[s];
        for (let i = 0; i < types.length; i++) cap += pool[types[i]];
        if (need > cap) return false;
      }
      return true;
    }
    pay(costKey, cost, pool, poolKey) {
      const key = costKey + "|" + poolKey;
      const hit = this.memo.get(key);
      if (hit !== void 0) return hit;
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
      for (const [bit, n] of cost.pips) {
        demand[bit] = (demand[bit] || 0) + n;
        need += n;
      }
      if (total < need) return null;
      const bits = Object.keys(demand).map(Number);
      if (bits.length && !this.feasible(demand, pool)) return null;
      const left = pool.slice();
      const spend = new Array(pool.length).fill(0);
      bits.sort((a, b) => {
        const ca = this.subsetTypes[a].reduce((s, t) => s + left[t], 0);
        const cb = this.subsetTypes[b].reduce((s, t) => s + left[t], 0);
        return ca - cb;
      });
      for (const bit of bits) {
        while (demand[bit] > 0) {
          const cands = this.subsetTypes[bit].filter((t) => left[t] > 0).sort((a, b) => this.flex[a] - this.flex[b]);
          let placed = false;
          for (const t of cands) {
            left[t] -= 1;
            demand[bit] -= 1;
            const rest = {};
            let any = false;
            for (const k of Object.keys(demand)) if (demand[k] > 0) {
              rest[k] = demand[k];
              any = true;
            }
            if (!any || this.feasible(rest, left)) {
              spend[t] += 1;
              placed = true;
              break;
            }
            left[t] += 1;
            demand[bit] += 1;
          }
          if (!placed) return null;
        }
      }
      if (generic) {
        const order = left.map((_, t) => t).sort((a, b) => this.flex[a] - this.flex[b]);
        for (const t of order) {
          const take = Math.min(generic, left[t]);
          left[t] -= take;
          spend[t] += take;
          generic -= take;
          if (!generic) break;
        }
        if (generic) return null;
      }
      return spend;
    }
  };
  function maskOf(produces) {
    let m = 0;
    for (const c of produces || []) m |= BIT[c] || 0;
    return m;
  }
  function costOf(card) {
    if (!card) return null;
    const pips = Object.entries(card.pips || {}).filter(([k]) => BIT[k]).map(([k, v]) => [BIT[k], v]).sort((a, b) => a[0] - b[0]);
    return {
      generic: card.generic || 0,
      pips,
      key: `${card.generic || 0}:${pips.map(([b, n]) => b + "x" + n).join(",")}`
    };
  }
  var CompiledDeck = class {
    constructor(cards, commander) {
      const maskSet = /* @__PURE__ */ new Set();
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
  };
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
      const tmp = order[i];
      order[i] = order[j];
      order[j] = tmp;
    }
  }
  function playOne(D, rnd, opts) {
    const { onPlay = true, minLands = 2, maxLands = 5 } = opts || {};
    const res = {
      mulligans: 0,
      keptLands: 0,
      landsByTurn: [],
      manaAvailable: [],
      manaSpent: [],
      commanderTurn: null,
      colourScrewTurns: 0,
      stuckOnLands: false,
      flooded: false,
      cardsCast: 0,
      seen: 0,
      landsSeen: 0
    };
    const order = D.scratch;
    let hand = [], library = [];
    for (let mull = 0; mull < 4; mull++) {
      partialShuffle(order, 34, rnd);
      hand = order.slice(0, 7);
      library = order.slice(7);
      const size = 7 - mull;
      let lands = 0, hasRamp = false;
      for (const i of hand) {
        if (D.isLand[i]) lands++;
        else if (D.ramp[i] && D.mv[i] <= 3) hasRamp = true;
      }
      const lo = Math.max(1, minLands - Math.floor((7 - size) / 2));
      if (mull === 3 || lo <= lands + (hasRamp ? 1 : 0) && lands <= maxLands) {
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
      pool = perm.slice();
      let needMask = 0;
      for (const i of hand) if (!D.isLand[i]) for (const [b] of D.cost[i].pips) needMask |= b;
      needMask &= ~haveMask;
      let best = null, bestKey = null;
      for (const i of hand) {
        if (!D.isLand[i]) continue;
        const late = D.tap[i] === TAP_ALWAYS || D.tap[i] === TAP_COND && turn <= 3;
        const key = [
          -POPCOUNT[D.prodMask[i] & needMask],
          late && turn <= 4 ? 1 : 0,
          -POPCOUNT[D.prodMask[i]]
        ];
        if (!bestKey || cmpKey(key, bestKey) < 0) {
          bestKey = key;
          best = i;
        }
      }
      if (best !== null) {
        hand.splice(hand.indexOf(best), 1);
        haveMask |= D.prodMask[best];
        nlands++;
        if (D.tap[best] === TAP_ALWAYS || D.tap[best] === TAP_COND && turn <= 3) {
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
      if (!cmdCast) {
        const sp = D.solver.pay(D.cmdCost.key, D.cmdCost, pool, pool.join(","));
        if (sp) {
          for (let t = 0; t < sp.length; t++) {
            pool[t] -= sp[t];
            free -= sp[t];
          }
          spent += D.cmdMv;
          cmdCast = true;
          res.commanderTurn = turn;
        }
      }
      for (; ; ) {
        if (!free) break;
        const poolKey = pool.join(",");
        let pick = null, pickKey = null, pickSp = null;
        for (const i of hand) {
          if (D.isLand[i]) continue;
          const sp = D.solver.pay(D.cost[i].key, D.cost[i], pool, poolKey);
          if (!sp) continue;
          const key = [D.ramp[i] && turn <= 5 ? 0 : 1, -D.mv[i]];
          if (!pickKey || cmpKey(key, pickKey) < 0) {
            pickKey = key;
            pick = i;
            pickSp = sp;
          }
        }
        if (pick === null) {
          for (const i of hand) if (!D.isLand[i] && D.mv[i] <= free) {
            screwed = true;
            break;
          }
          break;
        }
        for (let t = 0; t < pickSp.length; t++) {
          pool[t] -= pickSp[t];
          free -= pickSp[t];
        }
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
  function run(cards, commander, opts = {}) {
    const { games = 1e4, seed = 1234 } = opts;
    const D = opts.deck || new CompiledDeck(cards, commander);
    const rnd = mulberry32(seed);
    const out = new Array(games);
    for (let g = 0; g < games; g++) out[g] = playOne(D, rnd, opts);
    return out;
  }
  async function runChunked(cards, commander, opts = {}) {
    const { games = 1e4, seed = 1234, chunk = 1e3, onProgress } = opts;
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

  // src/simulator/report.js
  var mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
  var pct = (xs) => 100 * xs.filter(Boolean).length / Math.max(1, xs.length);
  function turnTo(results, n) {
    return mean(results.map((r) => {
      const i = r.landsByTurn.findIndex((v) => v >= n);
      return i < 0 ? 11 : i + 1;
    }));
  }
  function deterministic(cards) {
    const lands = cards.filter((c) => c.isLand);
    const spells = cards.filter((c) => !c.isLand);
    const pips = {}, sources = {};
    for (const c of spells) for (const [k, v] of Object.entries(c.pips)) pips[k] = (pips[k] || 0) + v;
    for (const l of lands) for (const k of l.produces || []) sources[k] = (sources[k] || 0) + 1;
    for (const c of spells) if (c.ramp) for (const k of c.produces || []) sources[k] = (sources[k] || 0) + 1;
    return {
      lands: lands.length,
      nonbasic: lands.filter((l) => !l.types.includes("Basic")).length,
      taplands: lands.filter((l) => l.entersTapped).length,
      ramp: spells.filter((c) => c.ramp).length,
      draw: spells.filter((c) => c.draw).length,
      removal: spells.filter((c) => c.removal).length,
      wipes: spells.filter((c) => c.wipe).length,
      creatures: spells.filter((c) => c.types.includes("Creature")).length,
      avgMv: Math.round(mean(spells.map((c) => c.mv)) * 100) / 100,
      pips,
      sources,
      unknown: [...new Set(cards.filter((c) => c.unknown).map((c) => c.name))]
    };
  }
  function karstenFlags(det) {
    const out = [];
    for (const [col, count] of Object.entries(det.pips).sort()) {
      const have = det.sources[col] || 0;
      const want = count <= 12 ? 19 : 27;
      if (have < want) out.push({ colour: col, have, pips: count, want });
    }
    return out;
  }
  function summarise(name, cards, commander, results) {
    const det = deterministic(cards);
    const avail = Array.from({ length: 10 }, (_, t) => mean(results.map((r) => r.manaAvailable[t])));
    const spent = Array.from({ length: 10 }, (_, t) => mean(results.map((r) => r.manaSpent[t])));
    const eff = spent.map((s2, i) => avail[i] ? s2 / avail[i] : 0);
    const cmdBy = {};
    if (commander) for (const t of [3, 4, 5, 6]) cmdBy[t] = pct(results.map((r) => r.commanderTurn !== null && r.commanderTurn <= t));
    const cmdTurns = results.map((r) => r.commanderTurn).filter((x) => x);
    const s = {
      name,
      games: results.length,
      det,
      keep7: pct(results.map((r) => r.mulligans === 0)),
      avgMull: mean(results.map((r) => r.mulligans)),
      t3Lands: turnTo(results, 3),
      t4Lands: turnTo(results, 4),
      t5Lands: turnTo(results, 5),
      stuck: pct(results.map((r) => r.stuckOnLands)),
      screw: pct(results.map((r) => r.colourScrewTurns > 0)),
      flood: pct(results.map((r) => r.flooded)),
      cmdBy,
      avgCmdTurn: cmdTurns.length ? mean(cmdTurns) : null,
      avail,
      spent,
      eff,
      effT3to6: mean(eff.slice(2, 6)),
      cardsCast: mean(results.map((r) => r.cardsCast)),
      hasCommander: !!commander,
      commander: commander ? commander.name : null
    };
    s.score = consistencyScore(s);
    s.karsten = karstenFlags(det);
    return s;
  }
  function consistencyScore(s) {
    const clamp = (x) => Math.max(0, Math.min(1, x));
    const parts = [
      [25, clamp(s.keep7 / 85)],
      [20, clamp(1 - (s.t4Lands - 4) / 3)],
      [20, clamp(s.effT3to6 / 0.85)],
      [15, clamp(1 - s.screw / 40)],
      [10, clamp(1 - s.stuck / 25)],
      [10, s.hasCommander ? clamp(s.cmdBy[4] / 70) : 1]
    ];
    return Math.round(parts.reduce((a, [w, v]) => a + w * v, 0) * 10) / 10;
  }

  // src/simulator/index.js
  async function simulate(text, opts = {}) {
    const { commanders: parsedCmd, entries } = parseList(text);
    if (!entries.length) throw new Error("No cards found in that list.");
    let commanders = opts.commander ? [opts.commander] : parsedCmd;
    const names = [.../* @__PURE__ */ new Set([...entries.map((e) => e.name), ...commanders])];
    const { data, misses, fuzzy } = await resolve(names, opts);
    const canon = (n) => data[n.toLowerCase()] ? data[n.toLowerCase()].name : n;
    const canonEntries = entries.map((e) => ({ qty: e.qty, name: canon(e.name) }));
    commanders = commanders.map(canon);
    if (!commanders.length) {
      for (const e of canonEntries) {
        const c = data[e.name.toLowerCase()];
        if (c && /Legendary/.test(c.type_line || "") && /Creature/.test(c.type_line || "")) {
          commanders = [c.name];
          break;
        }
      }
    }
    const { deck, commander } = buildDeck(canonEntries, commanders, data);
    const compiled = new CompiledDeck(deck, commander);
    const results = opts.onProgress ? await runChunked(deck, commander, __spreadProps(__spreadValues({}, opts), { deck: compiled })) : run(deck, commander, __spreadProps(__spreadValues({}, opts), { deck: compiled }));
    const s = summarise(opts.name || commanders[0] || "Deck", deck, commander, results);
    s.totalCards = canonEntries.reduce((a, e) => a + e.qty, 0) + commanders.length;
    s.unresolved = misses;
    s.fuzzyCorrections = fuzzy;
    s.guessedCommander = !parsedCmd.length && !opts.commander && !!commanders.length;
    return s;
  }

  // src/simulator/ui.js
  var h = () => window.React.createElement;
  var C = {
    bg: "#0d0d0f",
    panel: "rgba(201, 169, 97, 0.05)",
    edge: "rgba(201, 169, 97, 0.22)",
    ink: "#e8dcc4",
    dim: "#9a8765",
    faint: "#6a5a42",
    gold: "#d4b87a",
    goldBright: "#f5d98f",
    warn: "#c9705a"
  };
  var DISPLAY = "'Cinzel', serif";
  var BODY = "'Crimson Pro', serif";
  var MONO = "'JetBrains Mono', monospace";
  var PIP2 = { W: "#f8f0d8", U: "#a8cce8", B: "#9a8fa0", R: "#e89a86", G: "#9dc4a0" };
  var PIP_NAME = { W: "White", U: "Blue", B: "Black", R: "Red", G: "Green" };
  function Label(text) {
    const e = h();
    return e("div", {
      style: {
        fontFamily: DISPLAY,
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: C.dim,
        marginBottom: 8
      }
    }, text);
  }
  function Stat(key, label, value, warn) {
    const e = h();
    return e(
      "div",
      {
        key,
        style: {
          padding: "11px 12px",
          borderRadius: 4,
          background: C.panel,
          border: `1px solid ${C.edge}`
        }
      },
      e("div", {
        style: {
          fontFamily: MONO,
          fontSize: 19,
          fontWeight: 700,
          lineHeight: 1.1,
          color: warn ? C.warn : C.goldBright
        }
      }, value),
      e("div", {
        style: {
          fontFamily: DISPLAY,
          fontSize: 8.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.dim,
          marginTop: 5
        }
      }, label)
    );
  }
  function ManaCurve(avail, spent) {
    const e = h();
    const max = Math.max.apply(null, avail.concat([1]));
    return e("div", {
      style: { display: "flex", alignItems: "flex-end", gap: 5, height: 128 }
    }, avail.slice(0, 8).map((a, i) => {
      const s = spent[i];
      const eff = a ? s / a : 0;
      return e(
        "div",
        {
          key: i,
          style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }
        },
        e(
          "div",
          {
            style: { position: "relative", width: "100%", height: 100, display: "flex", alignItems: "flex-end" }
          },
          e("div", {
            style: {
              width: "100%",
              height: `${a / max * 100}%`,
              background: "rgba(201, 169, 97, 0.13)",
              borderRadius: "2px 2px 0 0"
            }
          }),
          e("div", {
            style: {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${s / max * 100}%`,
              background: eff < 0.6 ? "linear-gradient(180deg, #c9705a 0%, rgba(201,112,90,0.55) 100%)" : "linear-gradient(180deg, #f5d98f 0%, rgba(201,169,97,0.5) 100%)",
              borderRadius: "2px 2px 0 0"
            }
          })
        ),
        e("div", {
          style: { fontFamily: MONO, fontSize: 9, color: C.faint }
        }, `T${i + 1}`)
      );
    }));
  }
  function CommanderOdds(cmdBy, avgTurn) {
    const e = h();
    const cells = [3, 4, 5, 6].map((t) => e(
      "div",
      {
        key: t,
        style: {
          flex: 1,
          textAlign: "center",
          padding: "9px 2px",
          borderRadius: 4,
          background: C.panel,
          border: `1px solid ${C.edge}`
        }
      },
      e("div", {
        style: {
          fontFamily: MONO,
          fontSize: 15,
          fontWeight: 700,
          color: t === 4 && cmdBy[4] < 70 ? C.warn : C.goldBright
        }
      }, `${Math.round(cmdBy[t])}%`),
      e("div", {
        style: { fontFamily: DISPLAY, fontSize: 8, letterSpacing: "0.12em", color: C.dim, marginTop: 4 }
      }, `BY T${t}`)
    ));
    if (avgTurn) {
      cells.push(e(
        "div",
        {
          key: "avg",
          style: {
            flex: 1,
            textAlign: "center",
            padding: "9px 2px",
            borderRadius: 4,
            background: C.panel,
            border: `1px solid ${C.edge}`
          }
        },
        e("div", { style: { fontFamily: MONO, fontSize: 15, fontWeight: 700, color: C.ink } }, avgTurn.toFixed(1)),
        e("div", {
          style: { fontFamily: DISPLAY, fontSize: 8, letterSpacing: "0.12em", color: C.dim, marginTop: 4 }
        }, "AVERAGE")
      ));
    }
    return e("div", { style: { display: "flex", gap: 6 } }, cells);
  }
  function Section(key, title, note, body) {
    const e = h();
    return e(
      "section",
      { key, style: { marginTop: 26 } },
      Label(title),
      note && e("p", {
        style: {
          fontFamily: BODY,
          fontSize: 13.5,
          lineHeight: 1.55,
          color: C.dim,
          margin: "-4px 0 12px",
          maxWidth: "60ch"
        }
      }, note),
      body
    );
  }
  function SimulatorTab(props) {
    const React2 = window.React;
    const e = React2.createElement;
    const { useState: useState2, useCallback } = React2;
    const games = props.games || 1e4;
    const [text, setText] = useState2(props.initialList || "");
    const [busy, setBusy] = useState2(false);
    const [progress, setProgress] = useState2(0);
    const [summary, setSummary] = useState2(props.initialSummary || null);
    const [error, setError] = useState2(null);
    const [deck, setDeck] = useState2(props.initialDeck || null);
    React2.useEffect(() => {
      const onDeck = (ev) => {
        const d = ev.detail;
        if (!d || !d.list) return;
        setDeck(d);
        setText(d.list);
        setSummary(null);
        setError(null);
      };
      window.addEventListener("tq:sim-deck", onDeck);
      return () => window.removeEventListener("tq:sim-deck", onDeck);
    }, []);
    const runSim = useCallback(async () => {
      setError(null);
      setBusy(true);
      setProgress(0);
      if (props.haptic) props.haptic(15);
      try {
        const s2 = await simulate(text, {
          games,
          store: props.store,
          name: deck ? deck.commander : void 0,
          commander: deck ? deck.commander : void 0,
          onProgress: (done, total) => setProgress(done / total)
        });
        setSummary(s2);
        if (deck && window.TQ && window.TQ.recordDeckScore) {
          window.TQ.recordDeckScore(deck.id, s2.score);
        }
        if (props.onResult) props.onResult(s2);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setBusy(false);
      }
    }, [text, games, props, deck]);
    const s = summary;
    const kids = [];
    if (deck) {
      kids.push(e(
        "div",
        {
          key: "from",
          style: {
            marginBottom: 12,
            padding: "9px 12px",
            borderRadius: 4,
            background: C.panel,
            border: `1px solid ${C.edge}`,
            fontFamily: BODY,
            fontSize: 14,
            color: C.ink
          }
        },
        `Simulating ${deck.commander}`,
        e("button", {
          onClick: () => {
            setDeck(null);
            setText("");
            setSummary(null);
          },
          style: {
            marginLeft: 10,
            padding: 0,
            background: "none",
            border: "none",
            fontFamily: DISPLAY,
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.dim,
            cursor: "pointer"
          }
        }, "Clear")
      ));
    }
    kids.push(e("p", {
      key: "intro",
      style: {
        fontFamily: BODY,
        fontSize: 14.5,
        lineHeight: 1.6,
        color: C.dim,
        margin: "0 0 14px",
        maxWidth: "60ch"
      }
    }, `Plays the deck ${games.toLocaleString()} times against no opponent to see how reliably it finds its mana and gets its spells down. It measures consistency, not power.`));
    kids.push(e("textarea", {
      key: "input",
      value: text,
      onChange: (ev) => setText(ev.target.value),
      placeholder: "Paste a deck list\n\nCommander (1)\n1 Grimgrin, Corpse-Born\n\nDeck (99)\n1 Sol Ring\n14 Swamp",
      spellCheck: false,
      className: "tq-search-wrap",
      style: {
        width: "100%",
        minHeight: 128,
        padding: 11,
        fontFamily: MONO,
        fontSize: 12,
        lineHeight: 1.5,
        color: C.ink,
        background: "rgba(0,0,0,0.35)",
        border: `1px solid ${C.edge}`,
        borderRadius: 4,
        resize: "vertical"
      }
    }));
    kids.push(e("button", {
      key: "run",
      onClick: runSim,
      disabled: busy || !text.trim(),
      className: "active:scale-95 transition-all",
      style: {
        marginTop: 10,
        width: "100%",
        padding: "13px 16px",
        fontFamily: DISPLAY,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#1a1208",
        background: "linear-gradient(180deg, #f5d98f 0%, #c9a961 100%)",
        border: "none",
        borderRadius: 4,
        opacity: busy || !text.trim() ? 0.45 : 1
      }
    }, busy ? `Simulating ${Math.round(progress * 100)}%` : "Run simulation"));
    if (error) {
      kids.push(e("div", {
        key: "err",
        role: "alert",
        style: {
          marginTop: 12,
          padding: "11px 12px",
          borderRadius: 4,
          background: "rgba(201, 112, 90, 0.08)",
          border: `1px solid ${C.warn}`,
          fontFamily: BODY,
          fontSize: 14,
          color: C.ink
        }
      }, error));
    }
    if (s && !busy) {
      kids.push(Section(
        "consistency",
        "Consistency",
        null,
        e(
          "div",
          {
            style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(104px, 1fr))", gap: 7 }
          },
          Stat("score", "Score", String(s.score), false),
          Stat("keep", "Keep on seven", `${s.keep7.toFixed(0)}%`, s.keep7 < 85),
          Stat("t4", "Turn to 4 lands", s.t4Lands.toFixed(1), s.t4Lands > 5.4),
          Stat("screw", "Colour screw", `${s.screw.toFixed(0)}%`, s.screw > 8),
          Stat("stuck", "Short by T4", `${s.stuck.toFixed(0)}%`, s.stuck > 18),
          Stat("flood", "Flooded", `${s.flood.toFixed(0)}%`, false)
        )
      ));
      kids.push(Section(
        "mana",
        "Mana used against mana available",
        `Gold is what the deck actually spent. Turns three to six average ${(s.effT3to6 * 100).toFixed(0)}% \u2014 below about seventy means the curve and the mana base disagree.`,
        ManaCurve(s.avail, s.spent)
      ));
      if (s.hasCommander) {
        kids.push(Section(
          "cmd",
          `Casting ${s.commander}`,
          null,
          CommanderOdds(s.cmdBy, s.avgCmdTurn)
        ));
      }
      if (s.karsten.length) {
        kids.push(Section(
          "karsten",
          "Colour sources look light",
          "Counted against the coloured pips the deck is asking for.",
          e("div", null, s.karsten.map((k) => e(
            "div",
            {
              key: k.colour,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
                borderBottom: `1px solid ${C.edge}`
              }
            },
            e("span", {
              style: {
                width: 16,
                height: 16,
                borderRadius: 8,
                flexShrink: 0,
                background: PIP2[k.colour],
                boxShadow: `0 0 8px ${PIP2[k.colour]}55`
              }
            }),
            e(
              "span",
              { style: { fontFamily: BODY, fontSize: 14, color: C.ink } },
              `${PIP_NAME[k.colour]}: ${k.have} sources for ${k.pips} pips \u2014 around ${k.want} would be comfortable`
            )
          )))
        ));
      }
      kids.push(Section(
        "list",
        "What's in the list",
        null,
        e(
          "div",
          {
            style: { fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: C.dim }
          },
          `${s.det.lands} lands (${s.det.nonbasic} nonbasic, ${s.det.taplands} enter tapped), ${s.det.creatures} creatures, average mana value ${s.det.avgMv}`,
          e("br", null),
          `${s.det.ramp} ramp \xB7 ${s.det.draw} draw \xB7 ${s.det.removal} removal \xB7 ${s.det.wipes} board wipes`
        )
      ));
      const notes = [];
      if (s.totalCards !== 100) notes.push(`${s.totalCards} cards, not 100.`);
      if (s.guessedCommander) notes.push(`No commander was marked, so ${s.commander} was used.`);
      Object.keys(s.fuzzyCorrections).forEach((asked) => {
        notes.push(`Read \u201C${asked}\u201D as ${s.fuzzyCorrections[asked].name}.`);
      });
      if (s.unresolved.length) {
        notes.push(`Couldn\u2019t find ${s.unresolved.join(", ")} \u2014 counted as generic three-drops.`);
      }
      if (notes.length) {
        kids.push(Section(
          "check",
          "Worth checking",
          null,
          e("ul", {
            style: { margin: 0, paddingLeft: 18, fontFamily: BODY, fontSize: 14, lineHeight: 1.7, color: C.ink }
          }, notes.map((n, i) => e("li", { key: i }, n)))
        ));
      }
    }
    return e("div", { style: { padding: "16px 14px 90px", color: C.ink } }, kids);
  }
  function install() {
    const roots = /* @__PURE__ */ new WeakMap();
    window.TQ = window.TQ || {};
    window.TQ.runOddsFor = function(deck) {
      if (!deck || !deck.list) return;
      window.TQ._pendingDeck = deck;
      window.dispatchEvent(new CustomEvent("tq:sim-deck", { detail: deck }));
      if (typeof window.TQ.setTab === "function") window.TQ.setTab("odds");
    };
    window.TQ.mountSimulator = function(el) {
      if (!el || roots.has(el)) return;
      const React2 = window.React;
      const ReactDOM = window.ReactDOM;
      if (!React2 || !ReactDOM) return;
      const store = {
        get: async (k) => {
          try {
            const v = localStorage.getItem(`tq_scry:${k}`);
            return v ? JSON.parse(v) : void 0;
          } catch (_) {
            return void 0;
          }
        },
        set: async (k, v) => {
          try {
            localStorage.setItem(`tq_scry:${k}`, JSON.stringify(slim(v)));
          } catch (_) {
          }
        }
      };
      const props = {
        store,
        games: 1e4,
        haptic: window.TQ.haptic,
        onResult: (s) => {
          try {
            localStorage.setItem("tq_last_sim", JSON.stringify(s));
          } catch (_) {
          }
        },
        initialSummary: readLast(),
        initialDeck: window.TQ._pendingDeck || null
      };
      const root = ReactDOM.createRoot ? ReactDOM.createRoot(el) : { render: (node) => ReactDOM.render(node, el) };
      roots.set(el, root);
      root.render(React2.createElement(SimulatorTab, props));
    };
  }
  function slim(card) {
    if (!card || typeof card !== "object") return card;
    const keep = ["name", "cmc", "mana_cost", "type_line", "oracle_text", "produced_mana"];
    const out = {};
    for (const k of keep) if (card[k] !== void 0) out[k] = card[k];
    if (card.card_faces) {
      out.card_faces = card.card_faces.map((f) => {
        const g = {};
        for (const k of keep) if (f[k] !== void 0) g[k] = f[k];
        return g;
      });
    }
    return out;
  }
  function readLast() {
    try {
      const v = localStorage.getItem("tq_last_sim");
      return v ? JSON.parse(v) : null;
    } catch (_) {
      return null;
    }
  }

  // src/vault/helpers.js
  function _objectSpread(target, ...sources) {
    for (const s of sources) Object.assign(target, s || {});
    return target;
  }
  function _toConsumableArray(r) {
    return Array.isArray(r) ? r.slice() : Array.from(r);
  }

  // src/vault/vault.js
  var React = window.React;
  var { useState, useEffect } = React;
  var COLORS = {
    W: {
      label: "White",
      symbol: "\u2600\uFE0F",
      hex: "#F9FAF4",
      border: "#C8B560",
      text: "#5a4a00"
    },
    U: {
      label: "Blue",
      symbol: "\u{1F4A7}",
      hex: "#0E68AB",
      border: "#3A8FC7",
      text: "#ffffff"
    },
    B: {
      label: "Black",
      symbol: "\u{1F480}",
      hex: "#1A1A1A",
      border: "#6B6B6B",
      text: "#cccccc"
    },
    R: {
      label: "Red",
      symbol: "\u{1F525}",
      hex: "#D3202A",
      border: "#FF5050",
      text: "#ffffff"
    },
    G: {
      label: "Green",
      symbol: "\u{1F332}",
      hex: "#00733E",
      border: "#00A854",
      text: "#ffffff"
    },
    C: {
      label: "Colorless",
      symbol: "\u25C7",
      hex: "#9A9A9A",
      border: "#C0C0C0",
      text: "#ffffff"
    }
  };
  var ALL_COMBINATIONS = [{
    id: "W",
    name: "Mono-White",
    colors: ["W"]
  }, {
    id: "U",
    name: "Mono-Blue",
    colors: ["U"]
  }, {
    id: "B",
    name: "Mono-Black",
    colors: ["B"]
  }, {
    id: "R",
    name: "Mono-Red",
    colors: ["R"]
  }, {
    id: "G",
    name: "Mono-Green",
    colors: ["G"]
  }, {
    id: "C",
    name: "Colorless",
    colors: ["C"]
  }, {
    id: "WU",
    name: "Azorius",
    colors: ["W", "U"]
  }, {
    id: "WB",
    name: "Orzhov",
    colors: ["W", "B"]
  }, {
    id: "WR",
    name: "Boros",
    colors: ["W", "R"]
  }, {
    id: "WG",
    name: "Selesnya",
    colors: ["W", "G"]
  }, {
    id: "UB",
    name: "Dimir",
    colors: ["U", "B"]
  }, {
    id: "UR",
    name: "Izzet",
    colors: ["U", "R"]
  }, {
    id: "UG",
    name: "Simic",
    colors: ["U", "G"]
  }, {
    id: "BR",
    name: "Rakdos",
    colors: ["B", "R"]
  }, {
    id: "BG",
    name: "Golgari",
    colors: ["B", "G"]
  }, {
    id: "RG",
    name: "Gruul",
    colors: ["R", "G"]
  }, {
    id: "WUB",
    name: "Esper",
    colors: ["W", "U", "B"]
  }, {
    id: "WUR",
    name: "Jeskai",
    colors: ["W", "U", "R"]
  }, {
    id: "WUG",
    name: "Bant",
    colors: ["W", "U", "G"]
  }, {
    id: "WBR",
    name: "Mardu",
    colors: ["W", "B", "R"]
  }, {
    id: "WBG",
    name: "Abzan",
    colors: ["W", "B", "G"]
  }, {
    id: "WRG",
    name: "Naya",
    colors: ["W", "R", "G"]
  }, {
    id: "UBR",
    name: "Grixis",
    colors: ["U", "B", "R"]
  }, {
    id: "UBG",
    name: "Sultai",
    colors: ["U", "B", "G"]
  }, {
    id: "URG",
    name: "Temur",
    colors: ["U", "R", "G"]
  }, {
    id: "BRG",
    name: "Jund",
    colors: ["B", "R", "G"]
  }, {
    id: "WUBR",
    name: "Non-Green",
    colors: ["W", "U", "B", "R"]
  }, {
    id: "WUBG",
    name: "Non-Red",
    colors: ["W", "U", "B", "G"]
  }, {
    id: "WURG",
    name: "Non-Black",
    colors: ["W", "U", "R", "G"]
  }, {
    id: "WBRG",
    name: "Non-Blue",
    colors: ["W", "B", "R", "G"]
  }, {
    id: "UBRG",
    name: "Non-White",
    colors: ["U", "B", "R", "G"]
  }, {
    id: "WUBRG",
    name: "Five-Color",
    colors: ["W", "U", "B", "R", "G"]
  }];
  var STRIXHAVEN_SCHOOLS = [{
    id: "silverquill",
    name: "Silverquill",
    colors: ["W", "B"],
    colorId: "WB",
    motto: "Quill & Shadow",
    flavour: "Masters of rhetoric, poetry, and intimidation",
    crest: "\u2712\uFE0F",
    gradient: ["#2a1f3d", "#c8b560"]
  }, {
    id: "prismari",
    name: "Prismari",
    colors: ["U", "R"],
    colorId: "UR",
    motto: "Art Through Magic",
    flavour: "Elemental artists who paint with fire and water",
    crest: "\u{1F3A8}",
    gradient: ["#0e3d6b", "#c0392b"]
  }, {
    id: "witherbloom",
    name: "Witherbloom",
    colors: ["B", "G"],
    colorId: "BG",
    motto: "Life from Death",
    flavour: "Grim biologists who harvest the essence of life",
    crest: "\u{1F33F}",
    gradient: ["#0f2d1a", "#4a0a0a"]
  }, {
    id: "lorehold",
    name: "Lorehold",
    colors: ["R", "W"],
    colorId: "WR",
    motto: "Discover the Past",
    flavour: "Archaeomancers who bring history to life",
    crest: "\u{1F4DC}",
    gradient: ["#6b2a0e", "#c8a84b"]
  }, {
    id: "quandrix",
    name: "Quandrix",
    colors: ["G", "U"],
    colorId: "UG",
    motto: "Math is Magic",
    flavour: "Mathematicians who study the patterns of nature",
    crest: "\u{1F522}",
    gradient: ["#0a3d1f", "#0e3d6b"]
  }];
  var INITIAL_DECKS = [{
    id: 1,
    commander: "Halana and Alena, Partners",
    colors: ["R", "G"],
    theme: "Gruul +1/+1 Counters"
  }, {
    id: 2,
    commander: "Pantlaza, Sun-Favored",
    colors: ["W", "R", "G"],
    theme: "Naya Dinosaur Tribal"
  }, {
    id: 3,
    commander: "Omnath, Locus of Rage",
    colors: ["R", "G"],
    theme: "Gruul Landfall"
  }, {
    id: 4,
    commander: "Ghoulcaller Gisa",
    colors: ["B"],
    theme: "Mono-Black Zombie Aristocrats"
  }, {
    id: 5,
    commander: "Adeliz, the Cinder Wind",
    colors: ["U", "R"],
    theme: "Izzet Wizard Spellslinger"
  }, {
    id: 6,
    commander: "Kastral, the Windcrested",
    colors: ["W", "U"],
    theme: "Azorius Bird Tribal"
  }, {
    id: 7,
    commander: "Slimefoot and Squee",
    colors: ["B", "R", "G"],
    theme: "Jund Aristocrats / Reanimator"
  }, {
    id: 8,
    commander: "Sauron, the Dark Lord",
    colors: ["U", "B", "R"],
    theme: "Grixis Ring Temptation"
  }, {
    id: 9,
    commander: "Urza, Chief Artificer",
    colors: ["W", "U", "B"],
    theme: "Esper Artifacts"
  }, {
    id: 10,
    commander: "Saheeli, the Gifted",
    colors: ["U", "R"],
    theme: "Izzet Artifact Copies"
  }, {
    id: 11,
    commander: "Krenko, Mob Boss",
    colors: ["R"],
    theme: "Mono-Red Goblins"
  }, {
    id: 12,
    commander: "Dina, Soul Steeper",
    colors: ["B", "G"],
    theme: "Golgari Aristocrats / Lifegain"
  }, {
    id: 13,
    commander: "Quintorius, History Chaser",
    colors: ["R", "W"],
    theme: "Boros Graveyard / Spirits"
  }, {
    id: 14,
    commander: "Zinnia, Valley's Voice",
    colors: ["U", "R", "W"],
    theme: "Jeskai Offspring / Tokens"
  }, {
    id: 15,
    commander: "Brenard, Ginger Sculptor",
    colors: ["W", "U", "G"],
    theme: "Bant Food Golem Tokens"
  }, {
    id: 16,
    commander: "Ulalek, Fused Atrocity",
    colors: ["W", "U", "B", "R", "G"],
    theme: "Five-Color Eldrazi"
  }, {
    id: 17,
    commander: "Saruman of Many Colors",
    colors: ["W", "U", "R"],
    theme: "Jeskai Spellslinger"
  }];
  var nextId = function nextId2(decks) {
    return Math.max.apply(Math, [0].concat(_toConsumableArray(decks.map(function(d) {
      return d.id;
    })))) + 1;
  };
  function exactColorMatch(deckColors, comboColors) {
    return comboColors.every(function(c) {
      return deckColors.includes(c);
    }) && deckColors.every(function(c) {
      return comboColors.includes(c);
    });
  }
  function VaultColorPip(_ref19) {
    var c = _ref19.c, _ref19$size = _ref19.size, size = _ref19$size === void 0 ? 22 : _ref19$size;
    var col = COLORS[c];
    var letter = (c || "C").toUpperCase();
    var primary = "https://svgs.scryfall.io/card-symbols/" + letter + ".svg";
    var fallback = "img/mana/" + letter + ".svg";
    return React.createElement("img", {
      src: primary,
      alt: "{" + letter + "}",
      title: col ? col.label : letter,
      onError: function onError(e) {
        if (e.currentTarget.dataset.tqFb === "1") return;
        e.currentTarget.dataset.tqFb = "1";
        e.currentTarget.src = fallback;
      },
      style: {
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        boxShadow: "0 1px 4px rgba(0,0,0,0.5)"
      }
    });
  }
  function VaultColorBar({ colors }) {
    return React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        flexWrap: "wrap"
      }
    }, colors.map(function(c) {
      return React.createElement(VaultColorPip, {
        key: c,
        c
      });
    }));
  }
  function CommanderVault() {
    const [decks, setDecks] = useState(function() {
      try {
        var saved = localStorage.getItem("tq_vault_decks");
        var version = localStorage.getItem("tq_vault_version");
        if (saved && version === "v2") return JSON.parse(saved);
        if (saved && version !== "v2") {
          var initialNames = INITIAL_DECKS.map(function(d) {
            return d.commander.toLowerCase();
          });
          var oldDecks = JSON.parse(saved);
          var userAdditions = oldDecks.filter(function(d) {
            return d.commander && initialNames.indexOf(d.commander.toLowerCase()) === -1;
          });
          localStorage.setItem("tq_vault_version", "v2");
          return INITIAL_DECKS.concat(userAdditions);
        }
        localStorage.setItem("tq_vault_version", "v2");
        return INITIAL_DECKS;
      } catch (_unused15) {
        return INITIAL_DECKS;
      }
    });
    useEffect(function() {
      try {
        localStorage.setItem("tq_vault_decks", JSON.stringify(decks));
      } catch (e) {
        console.warn("Failed to save vault decks:", e);
      }
    }, [decks]);
    const [view, setView] = useState("decks");
    const [showAdd, setShowAdd] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [filterColor, setFilterColor] = useState(null);
    var _tqSortInit = (function() {
      try {
        return localStorage.getItem("tq_vault_sort") || "manual";
      } catch (e) {
        return "manual";
      }
    })();
    const [sortMode, setSortModeRaw] = useState(_tqSortInit);
    var setSortMode = function setSortMode2(m) {
      setSortModeRaw(m);
      try {
        localStorage.setItem("tq_vault_sort", m);
      } catch (e) {
      }
    };
    const [formCommander, setFormCommander] = useState("");
    const [formColors, setFormColors] = useState([]);
    const [formTheme, setFormTheme] = useState("");
    const [formList, setFormList] = useState("");
    var resetForm = function resetForm2() {
      setFormCommander("");
      setFormColors([]);
      setFormTheme("");
      setFormList("");
    };
    var openAdd = function openAdd2() {
      resetForm();
      setEditId(null);
      setShowAdd(true);
    };
    var openEdit = function openEdit2(deck) {
      setFormCommander(deck.commander);
      setFormColors(_toConsumableArray(deck.colors));
      setFormTheme(deck.theme);
      setFormList(deck.list || "");
      setEditId(deck.id);
      setShowAdd(true);
    };
    var toggleFormColor = function toggleFormColor2(c) {
      return setFormColors(function(prev) {
        return prev.includes(c) ? prev.filter(function(x) {
          return x !== c;
        }) : [].concat(_toConsumableArray(prev), [c]);
      });
    };
    var saveForm = function saveForm2() {
      if (!formCommander.trim() || formColors.length === 0) return;
      if (editId) {
        setDecks(function(prev) {
          return prev.map(function(d) {
            return d.id === editId ? _objectSpread(_objectSpread({}, d), {}, {
              commander: formCommander.trim(),
              colors: formColors,
              theme: formTheme.trim(),
              list: formList.trim()
            }) : d;
          });
        });
      } else {
        setDecks(function(prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: nextId(prev),
            commander: formCommander.trim(),
            colors: formColors,
            theme: formTheme.trim(),
            list: formList.trim()
          }]);
        });
      }
      setShowAdd(false);
      resetForm();
    };
    useEffect(function() {
      window.TQ = window.TQ || {};
      window.TQ.recordDeckScore = function(deckId, score) {
        setDecks(function(prev) {
          return prev.map(function(d) {
            return d.id === deckId ? _objectSpread(_objectSpread({}, d), {}, { simScore: score }) : d;
          });
        });
      };
      return function() {
        delete window.TQ.recordDeckScore;
      };
    }, []);
    var deleteDeck = function deleteDeck2(id) {
      return setDecks(function(prev) {
        return prev.filter(function(d) {
          return d.id !== id;
        });
      });
    };
    var coveredIds = new Set(ALL_COMBINATIONS.filter(function(combo) {
      return decks.some(function(d) {
        return exactColorMatch(d.colors, combo.colors);
      });
    }).map(function(c) {
      return c.id;
    }));
    var filtered = decks.filter(function(d) {
      var matchSearch = d.commander.toLowerCase().includes(search.toLowerCase()) || d.theme.toLowerCase().includes(search.toLowerCase());
      var matchColor = !filterColor || d.colors.includes(filterColor);
      return matchSearch && matchColor;
    });
    if (sortMode && sortMode !== "manual" && window.TQ && window.TQ.sortDecks) {
      filtered = window.TQ.sortDecks(filtered, sortMode);
    }
    var BG = "#0d0d0f";
    var SURFACE = "#141418";
    var SURFACE2 = "#1c1c22";
    var ACCENT = "#c8a84b";
    var ACCENT2 = "#7b5ea7";
    var TEXT = "#e8e4d8";
    var MUTED = "#6b6870";
    var tabs = [{
      id: "decks",
      label: "\u{1F0CF} Decks"
    }, {
      id: "coverage",
      label: "\u{1F5FA} Coverage"
    }, {
      id: "strixhaven",
      label: "\u{1F393} Strixhaven"
    }];
    return React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
        padding: "0 0 60px 0"
      }
    }, React.createElement("div", {
      style: {
        background: "linear-gradient(135deg, #0d0d0f 0%, #1a1520 50%, #0d0d0f 100%)",
        borderBottom: "1px solid ".concat(ACCENT, "44"),
        padding: "28px 24px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(8px)"
      }
    }, React.createElement("div", {
      style: {
        maxWidth: 900,
        margin: "0 auto"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        letterSpacing: 4,
        color: ACCENT,
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, "\u2694 Commander Registry"), React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 26,
        fontWeight: 700,
        color: TEXT,
        lineHeight: 1
      }
    }, "My Deck Vault"), React.createElement("div", {
      style: {
        fontSize: 13,
        color: MUTED,
        marginTop: 4
      }
    }, decks.length, " decks \xB7 ", coveredIds.size, " colour combinations covered")), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, tabs.map(function(t) {
      return React.createElement("button", {
        key: t.id,
        onClick: function onClick() {
          return setView(t.id);
        },
        style: {
          padding: "8px 16px",
          borderRadius: 6,
          border: "1px solid ".concat(view === t.id ? ACCENT : "#333"),
          background: view === t.id ? "".concat(ACCENT, "22") : "transparent",
          color: view === t.id ? ACCENT : MUTED,
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 13,
          letterSpacing: 0.5,
          transition: "all 0.2s"
        }
      }, t.label);
    }))))), React.createElement("div", {
      style: {
        maxWidth: 900,
        margin: "0 auto",
        padding: "24px 16px"
      }
    }, view === "decks" && React.createElement(React.Fragment, null, React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 20,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, React.createElement("input", {
      value: search,
      onChange: function onChange(e) {
        return setSearch(e.target.value);
      },
      placeholder: "Search commander or theme\u2026",
      style: {
        flex: 1,
        minWidth: 200,
        padding: "10px 14px",
        background: SURFACE,
        border: "1px solid #333",
        borderRadius: 8,
        color: TEXT,
        fontFamily: "inherit",
        fontSize: 14,
        outline: "none"
      }
    }), React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, ["W", "U", "B", "R", "G"].map(function(c) {
      return React.createElement("button", {
        key: c,
        onClick: function onClick() {
          return setFilterColor(filterColor === c ? null : c);
        },
        title: COLORS[c].label,
        style: {
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: filterColor === c ? COLORS[c].hex : SURFACE,
          border: "2px solid ".concat(filterColor === c ? COLORS[c].border : "#444"),
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          boxShadow: filterColor === c ? "0 0 10px ".concat(COLORS[c].border, "66") : "none",
          opacity: filterColor && filterColor !== c ? 0.45 : 1
        }
      }, React.createElement("img", {
        src: "https://svgs.scryfall.io/card-symbols/" + c + ".svg",
        alt: "{" + c + "}",
        onError: function onError(e) {
          if (e.currentTarget.dataset.tqFb === "1") return;
          e.currentTarget.dataset.tqFb = "1";
          e.currentTarget.src = "img/mana/" + c + ".svg";
        },
        style: { width: 20, height: 20, display: "block" }
      }));
    })), React.createElement("button", {
      onClick: openAdd,
      style: {
        padding: "10px 18px",
        borderRadius: 8,
        background: "linear-gradient(135deg, ".concat(ACCENT, ", #a8762e)"),
        border: "none",
        color: "#1a1200",
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, "+ Add Deck"), React.createElement("button", {
      onClick: function onClick() {
        var lines = filtered.map(function(d) {
          var colors = d.colors.join("");
          var tags = [d.theme, d.power && "Power ".concat(d.power), d.budget].filter(Boolean).join(" \xB7 ");
          return "\u2022 ".concat(d.commander, "  [").concat(colors || "C", "]  \u2014 ").concat(tags);
        });
        var text = "=== TOKEN QUEEN \u2014 COMMANDER VAULT ===\n".concat(filtered.length, " deck").concat(filtered.length === 1 ? "" : "s", "\n\n") + lines.join("\n");
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(text).catch(function() {
          });
        }
        alert("Deck list copied to clipboard");
      },
      title: "Export deck list",
      style: {
        padding: "10px 14px",
        borderRadius: 8,
        background: SURFACE,
        border: "1px solid ".concat(ACCENT, "66"),
        color: ACCENT,
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, "\u2B07 Export"), React.createElement("button", {
      onClick: function onClick() {
        if (window.TQ && typeof window.TQ.openDeckImport === "function") {
          window.TQ.openDeckImport(function(result) {
            var list = Array.isArray(result) ? result : [result];
            setDecks(function(prev) {
              var startId = nextId(prev);
              var newDecks = list.map(function(deck, i) {
                return {
                  id: startId + i,
                  commander: deck.commander,
                  colors: deck.colors,
                  theme: deck.theme || "",
                  cards: deck.cards || []
                };
              });
              return [].concat(_toConsumableArray(prev), newDecks);
            });
            if (window.TQ && window.TQ.toast) {
              if (list.length === 1) window.TQ.toast('Added "' + list[0].commander + '" to your vault');
              else window.TQ.toast("Added " + list.length + " decks to your vault");
            }
          });
        }
      },
      title: "Import deck",
      style: {
        padding: "10px 14px",
        borderRadius: 8,
        background: SURFACE,
        border: "1px solid ".concat(ACCENT, "66"),
        color: ACCENT,
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, "\u2B06 Import"), React.createElement(
      "select",
      {
        value: sortMode,
        onChange: function onChange(e) {
          setSortMode(e.target.value);
        },
        title: "Sort decks",
        style: {
          padding: "10px 10px",
          borderRadius: 8,
          background: SURFACE,
          border: "1px solid " + ACCENT + "66",
          color: ACCENT,
          fontFamily: "inherit",
          fontSize: 12,
          cursor: "pointer"
        }
      },
      React.createElement("option", { value: "manual" }, "Manual order"),
      React.createElement("option", { value: "alpha" }, "A \u2192 Z"),
      React.createElement("option", { value: "identity" }, "By colour identity")
    )), React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, filtered.length === 0 && React.createElement("div", {
      style: {
        textAlign: "center",
        color: MUTED,
        padding: "48px 0",
        fontSize: 16
      }
    }, "No decks match your filter"), filtered.map(function(deck) {
      return React.createElement(VaultDeckCard, {
        key: deck.id,
        deck,
        onEdit: function onEdit() {
          return openEdit(deck);
        },
        onDelete: function onDelete() {
          return deleteDeck(deck.id);
        },
        SURFACE,
        SURFACE2,
        ACCENT,
        MUTED,
        TEXT
      });
    }))), view === "coverage" && React.createElement(VaultCoverageView, {
      decks,
      coveredIds,
      SURFACE,
      SURFACE2,
      ACCENT,
      ACCENT2,
      MUTED,
      TEXT
    }), view === "strixhaven" && React.createElement(VaultStrixhavenView, {
      decks,
      SURFACE,
      SURFACE2,
      ACCENT,
      MUTED,
      TEXT
    })), showAdd && React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 16
      },
      onClick: function onClick(e) {
        if (e.target === e.currentTarget) setShowAdd(false);
      }
    }, React.createElement("div", {
      style: {
        background: SURFACE,
        border: "1px solid ".concat(ACCENT, "44"),
        borderRadius: 14,
        padding: 28,
        width: "100%",
        maxWidth: 440,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
      }
    }, React.createElement("h2", {
      style: {
        margin: "0 0 20px",
        fontSize: 20,
        color: ACCENT
      }
    }, editId ? "Edit Deck" : "Add New Deck"), React.createElement("label", {
      style: {
        fontSize: 12,
        color: MUTED,
        letterSpacing: 1,
        textTransform: "uppercase"
      }
    }, "Commander"), React.createElement("input", {
      value: formCommander,
      onChange: function onChange(e) {
        return setFormCommander(e.target.value);
      },
      placeholder: "e.g. Atraxa, Praetors' Voice",
      style: {
        width: "100%",
        marginTop: 6,
        marginBottom: 16,
        padding: "10px 12px",
        background: SURFACE2,
        border: "1px solid #444",
        borderRadius: 8,
        color: TEXT,
        fontFamily: "inherit",
        fontSize: 15,
        outline: "none",
        boxSizing: "border-box"
      }
    }), React.createElement("label", {
      style: {
        fontSize: 12,
        color: MUTED,
        letterSpacing: 1,
        textTransform: "uppercase"
      }
    }, "Colour Identity"), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 8,
        marginBottom: 16
      }
    }, ["W", "U", "B", "R", "G", "C"].map(function(c) {
      var on = formColors.includes(c);
      return React.createElement("button", {
        key: c,
        onClick: function onClick() {
          return toggleFormColor(c);
        },
        title: COLORS[c].label,
        style: {
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: on ? COLORS[c].hex : SURFACE2,
          border: "2px solid ".concat(on ? COLORS[c].border : "#555"),
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: on ? "0 0 12px ".concat(COLORS[c].border, "88") : "none",
          transition: "all 0.15s",
          opacity: on ? 1 : 0.55
        }
      }, React.createElement("img", {
        src: "https://svgs.scryfall.io/card-symbols/" + c + ".svg",
        alt: "{" + c + "}",
        onError: function onError(e) {
          if (e.currentTarget.dataset.tqFb === "1") return;
          e.currentTarget.dataset.tqFb = "1";
          e.currentTarget.src = "img/mana/" + c + ".svg";
        },
        style: { width: 24, height: 24, display: "block" }
      }));
    })), React.createElement("label", {
      style: {
        fontSize: 12,
        color: MUTED,
        letterSpacing: 1,
        textTransform: "uppercase"
      }
    }, "Theme / Strategy"), React.createElement("input", {
      value: formTheme,
      onChange: function onChange(e) {
        return setFormTheme(e.target.value);
      },
      placeholder: "e.g. Elf Tribal Combo",
      style: {
        width: "100%",
        marginTop: 6,
        marginBottom: 20,
        padding: "10px 12px",
        background: SURFACE2,
        border: "1px solid #444",
        borderRadius: 8,
        color: TEXT,
        fontFamily: "inherit",
        fontSize: 15,
        outline: "none",
        boxSizing: "border-box"
      }
    }), React.createElement("label", {
      style: {
        fontSize: 12,
        color: MUTED,
        letterSpacing: 1,
        textTransform: "uppercase"
      }
    }, "Deck list (optional)"), React.createElement("div", {
      style: {
        fontSize: 12,
        color: MUTED,
        marginTop: 4
      }
    }, "Paste an export here and the deck can be simulated from its card."), React.createElement("textarea", {
      value: formList,
      onChange: function onChange(e) {
        return setFormList(e.target.value);
      },
      spellCheck: false,
      placeholder: "1 Sol Ring\n14 Swamp\n\u2026",
      style: {
        width: "100%",
        marginTop: 6,
        marginBottom: 24,
        minHeight: 96,
        padding: "10px 12px",
        background: SURFACE2,
        border: "1px solid #444",
        borderRadius: 8,
        color: TEXT,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        lineHeight: 1.5,
        outline: "none",
        resize: "vertical",
        boxSizing: "border-box"
      }
    }), React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        justifyContent: "flex-end"
      }
    }, React.createElement("button", {
      onClick: function onClick() {
        return setShowAdd(false);
      },
      style: {
        padding: "10px 20px",
        borderRadius: 8,
        border: "1px solid #444",
        background: "transparent",
        color: MUTED,
        fontFamily: "inherit",
        fontSize: 14,
        cursor: "pointer"
      }
    }, "Cancel"), React.createElement("button", {
      onClick: saveForm,
      disabled: !formCommander.trim() || formColors.length === 0,
      style: {
        padding: "10px 24px",
        borderRadius: 8,
        border: "none",
        background: formCommander.trim() && formColors.length > 0 ? "linear-gradient(135deg, ".concat(ACCENT, ", #a8762e)") : "#333",
        color: formCommander.trim() && formColors.length > 0 ? "#1a1200" : MUTED,
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, editId ? "Save Changes" : "Add Deck")))));
  }
  function VaultDeckCard({ deck, onEdit, onDelete, SURFACE, SURFACE2, ACCENT, MUTED, TEXT }) {
    const [expanded, setExpanded] = useState(false);
    var borderColor = deck.colors.length === 1 ? COLORS[deck.colors[0]].border : ACCENT;
    return React.createElement("div", {
      style: {
        background: SURFACE,
        borderRadius: 10,
        border: "1px solid ".concat(borderColor, "33"),
        overflow: "hidden",
        transition: "all 0.2s",
        boxShadow: expanded ? "0 4px 20px ".concat(borderColor, "22") : "none"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setExpanded(function(e) {
          return !e;
        });
      }
    }, React.createElement(VaultColorBar, {
      colors: deck.colors
    }), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: TEXT,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, deck.commander), deck.theme && React.createElement("div", {
      style: {
        fontSize: 12,
        color: MUTED,
        marginTop: 2
      }
    }, deck.theme)), React.createElement("span", {
      style: {
        color: MUTED,
        fontSize: 16,
        transform: expanded ? "rotate(180deg)" : "none",
        transition: "0.2s"
      }
    }, "\u25BE")), expanded && React.createElement("div", {
      style: {
        background: SURFACE2,
        padding: "12px 16px",
        borderTop: "1px solid #333",
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, React.createElement("div", {
      style: {
        fontSize: 13,
        color: MUTED
      }
    }, React.createElement("span", {
      style: {
        color: TEXT,
        fontWeight: 600
      }
    }, "Identity: "), deck.colors.map(function(c, idx) {
      return React.createElement(
        "span",
        {
          key: c,
          style: { display: "inline-flex", alignItems: "center", gap: 4, marginRight: idx < deck.colors.length - 1 ? 8 : 0 }
        },
        React.createElement(VaultColorPip, { c, size: 14 }),
        React.createElement("span", null, COLORS[c].label)
      );
    }), deck.theme && React.createElement(React.Fragment, null, " \xB7 ", React.createElement("span", {
      style: {
        fontStyle: "italic"
      }
    }, deck.theme))), React.createElement(
      "div",
      {
        style: { display: "flex", flexWrap: "wrap", gap: 6 }
      },
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.copyDeckToClipboard) {
            window.TQ.copyDeckToClipboard({
              commander: deck.commander,
              theme: deck.theme,
              colors: deck.colors,
              cards: deck.cards || []
            }).then(function() {
              if (window.TQ && window.TQ.toast) window.TQ.toast("Deck copied to clipboard");
            });
          }
        },
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid " + ACCENT + "66", background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "\u{1F4CB} Export"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.validateDeck) window.TQ.validateDeck(deck);
        },
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid " + ACCENT + "66", background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "\u2713 Validate"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openInMoxfield) window.TQ.openInMoxfield(deck.commander);
        },
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid #553a99", background: "transparent", color: "#9a8acf", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Moxfield"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openInEDHREC) window.TQ.openInEDHREC(deck.commander);
        },
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid #993a3a", background: "transparent", color: "#cf8a8a", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "EDHREC"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openInScryfall) window.TQ.openInScryfall(deck.commander);
        },
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid #3a6a99", background: "transparent", color: "#8aaacf", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Scryfall"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.runOddsFor) window.TQ.runOddsFor(deck);
        },
        disabled: !deck.list,
        title: deck.list ? "Simulate this deck" : "Add a deck list in Edit to simulate this deck",
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid " + (deck.list ? ACCENT + "66" : "#3a3a3a"), background: "transparent", color: deck.list ? ACCENT : "#555", fontFamily: "inherit", fontSize: 11, cursor: deck.list ? "pointer" : "not-allowed" }
      }, deck.simScore != null ? "Odds \xB7 " + deck.simScore : "Odds"),
      React.createElement("button", {
        onClick: onEdit,
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid " + ACCENT + "66", background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Edit"),
      React.createElement("button", {
        onClick: onDelete,
        style: { padding: "6px 12px", borderRadius: 6, border: "1px solid #553333", background: "transparent", color: "#cc6666", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Remove")
    )));
  }
  function VaultCoverageView({ decks, coveredIds, SURFACE, SURFACE2, ACCENT, ACCENT2, MUTED, TEXT }) {
    var groups = [{
      label: "Mono-colour",
      ids: ["W", "U", "B", "R", "G", "C"]
    }, {
      label: "Two-colour (Guilds)",
      ids: ["WU", "WB", "WR", "WG", "UB", "UR", "UG", "BR", "BG", "RG"]
    }, {
      label: "Three-colour (Shards & Wedges)",
      ids: ["WUB", "WUR", "WUG", "WBR", "WBG", "WRG", "UBR", "UBG", "URG", "BRG"]
    }, {
      label: "Four-colour",
      ids: ["WUBR", "WUBG", "WURG", "WBRG", "UBRG"]
    }, {
      label: "Five-colour",
      ids: ["WUBRG"]
    }];
    var total = ALL_COMBINATIONS.length;
    var covered = coveredIds.size;
    var pct2 = Math.round(covered / total * 100);
    return React.createElement("div", null, React.createElement("div", {
      style: {
        background: SURFACE,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 24,
        border: "1px solid ".concat(ACCENT, "33")
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8
      }
    }, React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 16
      }
    }, "Colour Coverage"), React.createElement("span", {
      style: {
        color: ACCENT,
        fontWeight: 700
      }
    }, covered, " / ", total, " \xB7 ", pct2, "%")), React.createElement("div", {
      style: {
        height: 8,
        background: "#2a2a32",
        borderRadius: 4,
        overflow: "hidden"
      }
    }, React.createElement("div", {
      style: {
        height: "100%",
        width: "".concat(pct2, "%"),
        background: "linear-gradient(90deg, ".concat(ACCENT2, ", ").concat(ACCENT, ")"),
        borderRadius: 4,
        transition: "width 0.5s"
      }
    })), React.createElement("div", {
      style: {
        marginTop: 10,
        fontSize: 13,
        color: MUTED
      }
    }, total - covered, " combinations still uncovered \u2014 lots of room to grow! \u{1F331}")), groups.map(function(group) {
      return React.createElement("div", {
        key: group.label,
        style: {
          marginBottom: 24
        }
      }, React.createElement("h3", {
        style: {
          margin: "0 0 10px",
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: MUTED
        }
      }, group.label), React.createElement("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 8
        }
      }, group.ids.map(function(id) {
        var combo = ALL_COMBINATIONS.find(function(c) {
          return c.id === id;
        });
        var have = coveredIds.has(id);
        var matchDecks = decks.filter(function(d) {
          return exactColorMatch(d.colors, combo.colors);
        });
        return React.createElement("div", {
          key: id,
          title: have ? matchDecks.map(function(d) {
            return d.commander;
          }).join(", ") : "Missing: ".concat(combo.name),
          style: {
            background: have ? "".concat(ACCENT, "18") : SURFACE,
            border: "1px solid ".concat(have ? ACCENT + "55" : "#2a2a32"),
            borderRadius: 8,
            padding: "8px 12px",
            minWidth: 80,
            textAlign: "center",
            opacity: have ? 1 : 0.55,
            transition: "all 0.15s"
          }
        }, React.createElement("div", {
          style: {
            display: "flex",
            gap: 3,
            justifyContent: "center",
            marginBottom: 4
          }
        }, combo.colors.map(function(c) {
          return React.createElement(VaultColorPip, {
            key: c,
            c,
            size: 16
          });
        })), React.createElement("div", {
          style: {
            fontSize: 11,
            color: have ? TEXT : MUTED,
            fontWeight: have ? 600 : 400
          }
        }, combo.name), have ? React.createElement("div", {
          style: {
            fontSize: 10,
            color: ACCENT,
            marginTop: 2
          }
        }, "\u2713 ", matchDecks.length, " deck", matchDecks.length > 1 ? "s" : "") : React.createElement("div", {
          style: {
            fontSize: 10,
            color: "#cc6644",
            marginTop: 2
          }
        }, "\u2717 missing"));
      })));
    }));
  }
  function VaultStrixhavenView({ decks, SURFACE, SURFACE2, ACCENT, MUTED, TEXT }) {
    var covered = STRIXHAVEN_SCHOOLS.filter(function(school) {
      return decks.some(function(d) {
        return exactColorMatch(d.colors, school.colors);
      });
    }).length;
    return React.createElement("div", null, React.createElement("div", {
      style: {
        background: SURFACE,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 28,
        border: "1px solid ".concat(ACCENT, "33"),
        backgroundImage: "radial-gradient(ellipse at top right, #2a1f3d44, transparent)"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 10
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        letterSpacing: 4,
        color: ACCENT,
        textTransform: "uppercase",
        marginBottom: 6
      }
    }, "\u{1F393} Arcavios University"), React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 22,
        color: TEXT
      }
    }, "Strixhaven Schools"), React.createElement("p", {
      style: {
        margin: "6px 0 0",
        fontSize: 13,
        color: MUTED,
        maxWidth: 480
      }
    }, "The five colleges of Strixhaven each represent a unique two-colour philosophy. Which halls have you represented in your collection?")), React.createElement("div", {
      style: {
        background: covered === 5 ? "".concat(ACCENT, "22") : "#1a1a22",
        border: "1px solid ".concat(covered === 5 ? ACCENT : "#333"),
        borderRadius: 10,
        padding: "12px 20px",
        textAlign: "center",
        minWidth: 100
      }
    }, React.createElement("div", {
      style: {
        fontSize: 28,
        fontWeight: 700,
        color: covered === 5 ? ACCENT : TEXT
      }
    }, covered, "/5"), React.createElement("div", {
      style: {
        fontSize: 11,
        color: MUTED,
        letterSpacing: 1,
        textTransform: "uppercase"
      }
    }, covered === 5 ? "Complete! \u{1F389}" : "Schools"))), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 16
      }
    }, STRIXHAVEN_SCHOOLS.map(function(school) {
      var have = decks.some(function(d) {
        return exactColorMatch(d.colors, school.colors);
      });
      return React.createElement("div", {
        key: school.id,
        title: school.name,
        style: {
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: have ? "linear-gradient(90deg, ".concat(COLORS[school.colors[0]].border, ", ").concat(COLORS[school.colors[1]].border, ")") : "#2a2a32",
          transition: "background 0.3s"
        }
      });
    }))), React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, STRIXHAVEN_SCHOOLS.map(function(school) {
      var matchDecks = decks.filter(function(d) {
        return exactColorMatch(d.colors, school.colors);
      });
      var have = matchDecks.length > 0;
      var c0 = COLORS[school.colors[0]];
      var c1 = COLORS[school.colors[1]];
      return React.createElement("div", {
        key: school.id,
        style: {
          background: SURFACE,
          border: "1px solid ".concat(have ? c0.border + "55" : "#252528"),
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: have ? "0 4px 24px ".concat(c0.border, "18") : "none",
          transition: "all 0.2s"
        }
      }, React.createElement("div", {
        style: {
          background: "linear-gradient(135deg, ".concat(school.gradient[0], ", ").concat(school.gradient[1], ")"),
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: have ? 1 : 0.5
        }
      }, React.createElement("div", {
        style: {
          fontSize: 36,
          lineHeight: 1
        }
      }, school.crest), React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement("div", {
        style: {
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 2
        }
      }, school.name), React.createElement("div", {
        style: {
          fontSize: 12,
          color: "rgba(255,255,255,0.65)",
          fontStyle: "italic"
        }
      }, '"', school.motto, '"')), React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          alignItems: "center"
        }
      }, school.colors.map(function(c) {
        return React.createElement(VaultColorPip, {
          key: c,
          c,
          size: 26
        });
      }))), React.createElement("div", {
        style: {
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap"
        }
      }, React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 200
        }
      }, React.createElement("div", {
        style: {
          fontSize: 13,
          color: MUTED,
          marginBottom: 6
        }
      }, school.flavour), React.createElement("div", {
        style: {
          fontSize: 12,
          color: MUTED
        }
      }, "Colour identity: ", React.createElement("span", {
        style: {
          color: TEXT
        }
      }, school.colors.map(function(c) {
        return COLORS[c].label;
      }).join(" / ")))), have ? React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, React.createElement("div", {
        style: {
          fontSize: 11,
          color: ACCENT,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 4
        }
      }, "\u2713 Enrolled"), matchDecks.map(function(d) {
        return React.createElement("div", {
          key: d.id,
          style: {
            fontSize: 12,
            color: TEXT,
            background: SURFACE2,
            borderRadius: 6,
            padding: "4px 10px",
            marginBottom: 3,
            border: "1px solid #333"
          }
        }, d.commander);
      })) : React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#cc6644",
          fontStyle: "italic",
          background: "#cc664410",
          borderRadius: 8,
          padding: "8px 14px",
          border: "1px solid #cc664430"
        }
      }, "\u2717 Not yet enrolled")));
    })));
  }

  // src/vault/mount.js
  function install2() {
    const roots = /* @__PURE__ */ new WeakMap();
    window.TQ = window.TQ || {};
    window.TQ.CommanderVault = CommanderVault;
    window.TQ.mountVault = function(el) {
      if (!el || roots.has(el)) return;
      const React2 = window.React;
      const ReactDOM = window.ReactDOM;
      if (!React2 || !ReactDOM) return;
      const root = ReactDOM.createRoot ? ReactDOM.createRoot(el) : { render: (node) => ReactDOM.render(node, el) };
      roots.set(el, root);
      root.render(React2.createElement(CommanderVault, null));
    };
  }

  // src/main.js
  install();
  install2();
})();
