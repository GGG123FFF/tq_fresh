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

  // src/theme/tokens.js
  var tokens = {
    // Surfaces, darkest first
    "--tq-bg": "#05030a",
    "--tq-surface-deep": "#0a0604",
    "--tq-surface": "#1a110a",
    "--tq-surface-raised": "#241809",
    // Ink
    "--tq-ink": "#e8dcc4",
    // parchment — body text
    "--tq-ink-dim": "#9a8765",
    // warm brown — secondary
    "--tq-ink-faint": "#6a5a42",
    // captions, disabled
    // Gold. The signature; used for anything active, chosen or emphasised.
    "--tq-gold": "#c9a961",
    "--tq-gold-deep": "#d4b87a",
    "--tq-gold-bright": "#f5d98f",
    // States
    "--tq-danger": "#d48a86",
    "--tq-info": "#9fc7e6",
    // info blue, used across counters and hints
    "--tq-ink-mid": "#8a7555",
    // between dim and faint
    "--tq-life": "#b4d4a0",
    // life gain
    "--tq-life-deep": "#8fbc8f",
    // life gain, deeper
    "--tq-ink-warm": "#b09870",
    // raised label
    "--tq-danger-soft": "#e8947a",
    // damage, lighter
    "--tq-danger-deep": "#a0302c",
    // damage, deeper
    "--tq-brass": "#8a6f3a",
    // inactive metal
    "--tq-edge": "rgba(201, 169, 97, 0.22)",
    "--tq-edge-strong": "rgba(201, 169, 97, 0.45)",
    "--tq-panel": "rgba(201, 169, 97, 0.05)",
    // Type. The old scale was 7/8/9/10/11px — five sizes inside four pixels,
    // which produced no hierarchy and was genuinely hard to read at arm's length
    // in low light. This has a legible floor and real steps between levels.
    "--tq-label": "11px",
    // Cinzel, tracked uppercase
    "--tq-body-sm": "13px",
    "--tq-body": "15px",
    "--tq-figure-sm": "20px",
    "--tq-figure": "28px",
    "--tq-figure-lg": "40px",
    // Families
    "--tq-display": "'Cinzel', serif",
    "--tq-text": "'Crimson Pro', serif",
    "--tq-mono": "'JetBrains Mono', monospace",
    // The smallest comfortable tap target for a thumb, one-handed, holding cards
    // in the other hand. Several button rows were sitting at about 28px.
    "--tq-tap": "44px"
  };
  var T = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [k.replace("--tq-", "").replace(/-(\w)/g, (_, c) => c.toUpperCase()), `var(${k})`])
  );
  var raw = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [k.replace("--tq-", "").replace(/-(\w)/g, (_, c) => c.toUpperCase()), v])
  );
  function install() {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(tokens)) {
      if (!root.style.getPropertyValue(k)) root.style.setProperty(k, v);
    }
  }

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
    for (const raw2 of String(text).split("\n")) {
      const line = raw2.trim();
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
    for (const raw2 of syms) {
      const s = raw2.slice(1, -1).toUpperCase();
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
      for (const raw2 of syms.slice(0, 3)) {
        const s = raw2.slice(1, -1);
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
    const need2 = [];
    for (const n of names) {
      const hit = await cache.get(n.toLowerCase());
      if (hit) data[n.toLowerCase()] = hit;
      else need2.push(n);
    }
    if (!need2.length || offline) return { data, misses: offline ? need2 : [], fuzzy: {} };
    let misses = [];
    for (let i = 0; i < need2.length; i += 75) {
      const chunk = need2.slice(i, i + 75);
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
      if (onProgress) onProgress(Math.min(i + 75, need2.length), need2.length);
      await sleep(120);
    }
    misses = [.../* @__PURE__ */ new Set([...misses, ...need2.filter((n) => !data[n.toLowerCase()])])];
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
        let need2 = 0, b = s;
        while (b) {
          const low = b & -b;
          need2 += demand[low] || 0;
          b ^= low;
        }
        if (!need2) continue;
        let cap = 0;
        const types = this.subsetTypes[s];
        for (let i = 0; i < types.length; i++) cap += pool[types[i]];
        if (need2 > cap) return false;
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
      let need2 = generic;
      for (const [bit, n] of cost.pips) {
        demand[bit] = (demand[bit] || 0) + n;
        need2 += n;
      }
      if (total < need2) return null;
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
      let lands = 0, hasRamp = false, castable = 0, cheap = 0;
      for (const i of hand) {
        if (D.isLand[i]) {
          lands++;
          continue;
        }
        if (D.ramp[i] && D.mv[i] <= 3) hasRamp = true;
        if (D.mv[i] <= lands + 2) castable++;
        if (D.mv[i] <= 3) cheap++;
      }
      const lo = Math.max(1, minLands - Math.floor((7 - size) / 2));
      const landsOk = lo <= lands + (hasRamp ? 1 : 0) && lands <= maxLands;
      const hasPlan = size <= 6 ? castable >= 1 : castable >= 1 && cheap >= 1;
      if (mull === 3 || landsOk && hasPlan) {
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
        let pick2 = null, pickKey = null, pickSp = null;
        for (const i of hand) {
          if (D.isLand[i]) continue;
          const sp = D.solver.pay(D.cost[i].key, D.cost[i], pool, poolKey);
          if (!sp) continue;
          const key = [D.ramp[i] && turn <= 5 ? 0 : 1, -D.mv[i]];
          if (!pickKey || cmpKey(key, pickKey) < 0) {
            pickKey = key;
            pick2 = i;
            pickSp = sp;
          }
        }
        if (pick2 === null) {
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
        hand.splice(hand.indexOf(pick2), 1);
        spent += D.mv[pick2];
        res.cardsCast++;
        if (D.ramp[pick2]) pending.push([D.rampSrc[pick2], D.ramp[pick2]]);
        for (let k = 0; k < D.draw[pick2]; k++) drawCard();
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
    const runOpts = __spreadProps(__spreadValues({}, opts), { onPlay: !opts.on_draw });
    const results = runOpts.onProgress ? await runChunked(deck, commander, __spreadProps(__spreadValues({}, runOpts), { deck: compiled })) : run(deck, commander, __spreadProps(__spreadValues({}, runOpts), { deck: compiled }));
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
    bg: "var(--tq-bg)",
    panel: "var(--tq-panel)",
    edge: "var(--tq-edge)",
    ink: "var(--tq-ink)",
    dim: "var(--tq-ink-dim)",
    faint: "var(--tq-ink-faint)",
    gold: "var(--tq-gold-deep)",
    goldBright: "var(--tq-gold-bright)",
    warn: "var(--tq-danger)"
  };
  var DISPLAY = "var(--tq-display)";
  var BODY = "var(--tq-text)";
  var MONO = "var(--tq-mono)";
  var PIP2 = { W: "#f8f0d8", U: "#a8cce8", B: "#9a8fa0", R: "#e89a86", G: "#9dc4a0" };
  var PIP_NAME = { W: "White", U: "Blue", B: "Black", R: "Red", G: "Green" };
  function Label(text) {
    const e = h();
    return e("div", {
      style: {
        fontFamily: DISPLAY,
        fontSize: 11,
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
          fontSize: 11,
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
          style: { fontFamily: MONO, fontSize: 11, color: C.faint }
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
        style: { fontFamily: DISPLAY, fontSize: 11, letterSpacing: "0.12em", color: C.dim, marginTop: 4 }
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
          style: { fontFamily: DISPLAY, fontSize: 11, letterSpacing: "0.12em", color: C.dim, marginTop: 4 }
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
    const [onDraw, setOnDraw] = useState2(false);
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
          on_draw: onDraw,
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
    }, [text, games, props, deck, onDraw]);
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
            padding: "0 8px",
            minHeight: "var(--tq-tap)",
            background: "none",
            border: "none",
            fontFamily: DISPLAY,
            fontSize: 11,
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
      key: "scan",
      onClick: () => {
        const open = window.TQ && (window.TQ.openLiveScanner || window.TQ.openScanner);
        if (open) {
          open((scanned) => {
            if (scanned) setText((prev) => prev ? prev + "\n" + scanned : scanned);
          });
        }
      },
      style: {
        marginTop: 10,
        width: "100%",
        minHeight: "var(--tq-tap)",
        borderRadius: 4,
        cursor: "pointer",
        background: "transparent",
        border: `1px solid ${C.edge}`,
        color: C.dim,
        fontFamily: DISPLAY,
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase"
      }
    }, "Scan cards in"));
    kids.push(e("div", {
      key: "onplay",
      style: { display: "flex", gap: 6, marginTop: 10 }
    }, [false, true].map((v) => e("button", {
      key: String(v),
      onClick: () => setOnDraw(v),
      style: {
        flex: 1,
        minHeight: 38,
        borderRadius: 4,
        cursor: "pointer",
        fontFamily: DISPLAY,
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        background: "transparent",
        border: `1px solid ${onDraw === v ? "var(--tq-edge-strong)" : C.edge}`,
        color: onDraw === v ? C.goldBright : C.dim
      }
    }, v ? "On the draw" : "On the play"))));
    kids.push(e("button", {
      key: "run",
      onClick: runSim,
      disabled: busy || !text.trim(),
      className: "active:scale-95 transition-all",
      style: {
        marginTop: 10,
        width: "100%",
        minHeight: "var(--tq-tap)",
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
  function install2() {
    const roots = /* @__PURE__ */ new WeakMap();
    window.TQ = window.TQ || {};
    window.TQ.runOddsFor = function(deck) {
      if (!deck || !deck.list) return;
      window.TQ._pendingDeck = deck;
      window.dispatchEvent(new CustomEvent("tq:sim-deck", { detail: deck }));
      if (typeof window.TQ.setTab === "function") window.TQ.setTab("odds");
    };
    window.TQ.mountSimulator = function(el4) {
      if (!el4 || roots.has(el4)) return;
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
      const root = ReactDOM.createRoot ? ReactDOM.createRoot(el4) : { render: (node) => ReactDOM.render(node, el4) };
      roots.set(el4, root);
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
  var useState = (...a) => window.React.useState(...a);
  var useEffect = (...a) => window.React.useEffect(...a);
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
    var fallback2 = "img/mana/" + letter + ".svg";
    return React.createElement("img", {
      src: primary,
      alt: "{" + letter + "}",
      title: col ? col.label : letter,
      onError: function onError(e) {
        if (e.currentTarget.dataset.tqFb === "1") return;
        e.currentTarget.dataset.tqFb = "1";
        e.currentTarget.src = fallback2;
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
    var BG = "var(--tq-bg)";
    var SURFACE = "var(--tq-surface)";
    var SURFACE2 = "var(--tq-surface-raised)";
    var ACCENT = "var(--tq-gold)";
    var ACCENT2 = "#7b5ea7";
    var ACCENT_EDGE2 = "1px solid var(--tq-edge-strong)";
    var TEXT = "var(--tq-ink)";
    var MUTED = "var(--tq-ink-dim)";
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
        if (!window.TQ) return;
        var open = window.TQ.openLiveScanner || window.TQ.openScanner;
        if (!open) return;
        open(function(text) {
          if (!text) return;
          resetForm();
          setEditId(null);
          setFormList(text);
          setShowAdd(true);
        });
      },
      style: {
        padding: "10px 16px",
        borderRadius: 8,
        background: "transparent",
        border: "1px solid var(--tq-edge-strong)",
        color: ACCENT,
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, "Scan Deck"), React.createElement("button", {
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
          border: ACCENT_EDGE2,
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
    }, React.createElement(
      "div",
      {
        style: {
          background: SURFACE,
          border: "1px solid ".concat(ACCENT, "44"),
          borderRadius: 14,
          padding: 28,
          width: "100%",
          maxWidth: 440,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
        }
      },
      React.createElement("h2", {
        style: {
          margin: "0 0 20px",
          fontSize: 20,
          color: ACCENT
        }
      }, editId ? "Edit Deck" : "Add New Deck"),
      React.createElement("label", {
        style: {
          fontSize: 12,
          color: MUTED,
          letterSpacing: 1,
          textTransform: "uppercase"
        }
      }, "Commander"),
      React.createElement("input", {
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
      }),
      React.createElement("label", {
        style: {
          fontSize: 12,
          color: MUTED,
          letterSpacing: 1,
          textTransform: "uppercase"
        }
      }, "Colour Identity"),
      React.createElement("div", {
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
      })),
      React.createElement("label", {
        style: {
          fontSize: 12,
          color: MUTED,
          letterSpacing: 1,
          textTransform: "uppercase"
        }
      }, "Theme / Strategy"),
      React.createElement("input", {
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
      }),
      React.createElement("label", {
        style: {
          fontSize: 12,
          color: MUTED,
          letterSpacing: 1,
          textTransform: "uppercase"
        }
      }, "Deck list (optional)"),
      React.createElement("div", {
        style: {
          fontSize: 12,
          color: MUTED,
          marginTop: 4
        }
      }, "Paste an export here, or scan cards in, and the deck can be simulated from its card."),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openScanner) {
            window.TQ.openScanner(function(text) {
              if (text) setFormList(function(prev) {
                return prev ? prev + "\n" + text : text;
              });
            });
          }
        },
        style: {
          marginTop: 8,
          minHeight: "var(--tq-tap)",
          padding: "0 14px",
          borderRadius: 4,
          background: "transparent",
          cursor: "pointer",
          border: "1px solid var(--tq-edge-strong)",
          color: "var(--tq-gold)",
          fontFamily: "var(--tq-display)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase"
        }
      }, "Scan cards"),
      React.createElement("textarea", {
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
      }),
      React.createElement("div", {
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
      }, editId ? "Save Changes" : "Add Deck"))
    )));
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
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: ACCENT_EDGE, background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "\u{1F4CB} Export"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.validateDeck) window.TQ.validateDeck(deck);
        },
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: ACCENT_EDGE, background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "\u2713 Validate"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openInMoxfield) window.TQ.openInMoxfield(deck.commander);
        },
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #553a99", background: "transparent", color: "#9a8acf", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Moxfield"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openInEDHREC) window.TQ.openInEDHREC(deck.commander);
        },
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #993a3a", background: "transparent", color: "#cf8a8a", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "EDHREC"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.openInScryfall) window.TQ.openInScryfall(deck.commander);
        },
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #3a6a99", background: "transparent", color: "#8aaacf", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Scryfall"),
      React.createElement("button", {
        onClick: function() {
          if (window.TQ && window.TQ.runOddsFor) window.TQ.runOddsFor(deck);
        },
        disabled: !deck.list,
        title: deck.list ? "Simulate this deck" : "Add a deck list in Edit to simulate this deck",
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid " + (deck.list ? "var(--tq-edge-strong)" : "var(--tq-edge)"), background: "transparent", color: deck.list ? ACCENT : "#555", fontFamily: "inherit", fontSize: 11, cursor: deck.list ? "pointer" : "not-allowed" }
      }, deck.simScore != null ? "Odds \xB7 " + deck.simScore : "Odds"),
      React.createElement("button", {
        onClick: onEdit,
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: ACCENT_EDGE, background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
      }, "Edit"),
      React.createElement("button", {
        onClick: onDelete,
        style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #553333", background: "transparent", color: "#cc6666", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
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
            border: "1px solid ".concat(have ? "var(--tq-edge-strong)" : "var(--tq-edge)"),
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
  function install3() {
    const roots = /* @__PURE__ */ new WeakMap();
    window.TQ = window.TQ || {};
    window.TQ.CommanderVault = CommanderVault;
    window.TQ.mountVault = function(el4) {
      if (!el4 || roots.has(el4)) return;
      const React2 = window.React;
      const ReactDOM = window.ReactDOM;
      if (!React2 || !ReactDOM) return;
      const root = ReactDOM.createRoot ? ReactDOM.createRoot(el4) : { render: (node) => ReactDOM.render(node, el4) };
      roots.set(el4, root);
      root.render(React2.createElement(CommanderVault, null));
    };
  }

  // src/sanctum/seal.js
  var NS = "http://www.w3.org/2000/svg";
  var STEPS = 7;
  var R_OUTER = 92;
  var R_INNER = 60;
  var ID = "tq-seal";
  var el = null;
  var fadeTimer = null;
  function svg(tag, attrs) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function styles() {
    if (document.getElementById("tq-seal-style")) return;
    const s = document.createElement("style");
    s.id = "tq-seal-style";
    s.textContent = `
    #${ID} {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none; opacity: 0;
      transition: opacity 420ms ease-out;
    }
    #${ID}.tq-seal-on { opacity: 1; }
    #${ID} .ring-outer { transform-origin: center; animation: tqSealSpin 24s linear infinite; }
    #${ID} .ring-inner { transform-origin: center; animation: tqSealSpin 16s linear infinite reverse; }
    #${ID}.near .ring-outer { animation-duration: 7s; }
    #${ID}.near .ring-inner { animation-duration: 4s; }
    #${ID} .rune { opacity: 0.12; transition: opacity 260ms ease-out; }
    #${ID} .rune.lit { opacity: 1; }
    #${ID} .arc { transition: stroke-dashoffset 340ms cubic-bezier(.22,1,.36,1); }
    #${ID} .core { transform-origin: center; transition: transform 300ms ease-out, opacity 300ms; }
    #${ID}.near .core { animation: tqSealPulse 900ms ease-in-out infinite; }
    @keyframes tqSealSpin { to { transform: rotate(360deg); } }
    @keyframes tqSealPulse { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
    @keyframes tqSealBreak {
      0%   { transform: scale(1);    opacity: 1; filter: brightness(1); }
      35%  { transform: scale(1.08); opacity: 1; filter: brightness(2.4); }
      100% { transform: scale(2.2);  opacity: 0; filter: brightness(1); }
    }
    #${ID}.breaking .stack { animation: tqSealBreak 620ms cubic-bezier(.3,0,.2,1) forwards; }
    #${ID} .flash { opacity: 0; }
    #${ID}.breaking .flash { animation: tqSealFlash 520ms ease-out forwards; }
    @keyframes tqSealFlash { 0% { opacity: 0 } 18% { opacity: .8 } 100% { opacity: 0 } }
    @media (prefers-reduced-motion: reduce) {
      #${ID} .ring-outer, #${ID} .ring-inner, #${ID} .core { animation: none !important; }
    }
  `;
    document.head.appendChild(s);
  }
  function build() {
    styles();
    const host2 = document.createElement("div");
    host2.id = ID;
    const s = svg("svg", { width: 260, height: 260, viewBox: "-130 -130 260 260" });
    const stack = svg("g", { class: "stack" });
    stack.appendChild(svg("circle", {
      class: "flash",
      r: 126,
      fill: "var(--tq-gold-bright)",
      opacity: 0
    }));
    const outer = svg("g", { class: "ring-outer" });
    outer.appendChild(svg("circle", {
      r: R_OUTER,
      fill: "none",
      stroke: "var(--tq-gold)",
      "stroke-opacity": 0.16,
      "stroke-width": 1
    }));
    for (let i = 0; i < STEPS; i++) {
      const a = i / STEPS * Math.PI * 2 - Math.PI / 2;
      outer.appendChild(svg("line", {
        x1: Math.cos(a) * (R_OUTER - 7),
        y1: Math.sin(a) * (R_OUTER - 7),
        x2: Math.cos(a) * (R_OUTER + 7),
        y2: Math.sin(a) * (R_OUTER + 7),
        stroke: "var(--tq-gold)",
        "stroke-opacity": 0.3,
        "stroke-width": 1
      }));
    }
    stack.appendChild(outer);
    const circumference = 2 * Math.PI * R_OUTER;
    const arc = svg("circle", {
      class: "arc",
      r: R_OUTER,
      fill: "none",
      stroke: "var(--tq-gold-bright)",
      "stroke-width": 2.5,
      "stroke-linecap": "round",
      "stroke-dasharray": circumference,
      "stroke-dashoffset": circumference,
      transform: "rotate(-90)",
      filter: "drop-shadow(0 0 6px rgba(245,217,143,0.65))"
    });
    stack.appendChild(arc);
    const inner = svg("g", { class: "ring-inner" });
    inner.appendChild(svg("circle", {
      r: R_INNER,
      fill: "none",
      stroke: "var(--tq-gold)",
      "stroke-opacity": 0.12,
      "stroke-width": 1,
      "stroke-dasharray": "3 7"
    }));
    const runes = [];
    for (let i = 0; i < STEPS; i++) {
      const a = i / STEPS * Math.PI * 2 - Math.PI / 2;
      const g = svg("g", {
        class: "rune",
        transform: `translate(${Math.cos(a) * R_INNER} ${Math.sin(a) * R_INNER}) rotate(${a * 180 / Math.PI + 90})`
      });
      g.appendChild(svg("path", {
        d: "M0,-7 L5,0 L0,7 L-5,0 Z M0,-3 L0,3",
        fill: "none",
        stroke: "var(--tq-gold-bright)",
        "stroke-width": 1.6,
        "stroke-linejoin": "round",
        filter: "drop-shadow(0 0 4px rgba(245,217,143,0.8))"
      }));
      inner.appendChild(g);
      runes.push(g);
    }
    stack.appendChild(inner);
    const core = svg("g", { class: "core" });
    core.appendChild(svg("circle", {
      r: 15,
      fill: "none",
      stroke: "var(--tq-gold)",
      "stroke-width": 1.4,
      "stroke-opacity": 0.7
    }));
    core.appendChild(svg("path", {
      d: "M0,-6 a6,6 0 1,1 -0.01,0 M-3.2,4 L3.2,4 L1.8,13 L-1.8,13 Z",
      fill: "var(--tq-gold-bright)",
      opacity: 0.9
    }));
    stack.appendChild(core);
    s.appendChild(stack);
    host2.appendChild(s);
    document.body.appendChild(host2);
    return { host: host2, arc, runes, core, circumference };
  }
  function ensure() {
    if (el && document.body.contains(el.host)) return el;
    el = build();
    return el;
  }
  function sealProgress(n) {
    const e = ensure();
    clearTimeout(fadeTimer);
    e.host.classList.remove("breaking");
    e.host.classList.add("tq-seal-on");
    e.host.classList.toggle("near", n >= 5);
    const frac = Math.min(n, STEPS) / STEPS;
    e.arc.setAttribute("stroke-dashoffset", String(e.circumference * (1 - frac)));
    e.runes.forEach((r, i) => r.classList.toggle("lit", i < n));
    e.core.setAttribute("transform", `scale(${1 + frac * 0.5})`);
    fadeTimer = setTimeout(() => hide(), 3200);
  }
  function sealBreak() {
    const e = ensure();
    clearTimeout(fadeTimer);
    e.host.classList.add("tq-seal-on", "breaking");
    fadeTimer = setTimeout(() => hide(), 700);
  }
  function hide() {
    if (!el) return;
    el.host.classList.remove("tq-seal-on", "near", "breaking");
    el.arc.setAttribute("stroke-dashoffset", String(el.circumference));
    el.runes.forEach((r) => r.classList.remove("lit"));
    el.core.setAttribute("transform", "scale(1)");
  }
  function install4() {
    window.TQ = window.TQ || {};
    window.TQ.sealProgress = sealProgress;
    window.TQ.sealBreak = sealBreak;
    window.TQ.sealHide = hide;
  }

  // src/pet/hatchery.js
  function hatcheryBackdropSvg({ lit = 0 } = {}) {
    const g = "#c9a961";
    const gb = "#f5d98f";
    const runes = [];
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * Math.PI * 2 - Math.PI / 2;
      const x = 200 + Math.cos(a) * 96;
      const y = 132 + Math.sin(a) * 58;
      const on = i < lit;
      runes.push(
        `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" opacity="${on ? 0.85 : 0.18}">
         <path d="M0,-6 L4,0 L0,6 L-4,0 Z M0,-2.5 L0,2.5" fill="none"
               stroke="${on ? gb : g}" stroke-width="1.4" stroke-linejoin="round"/>
       </g>`
      );
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <radialGradient id="vault" cx="50%" cy="38%" r="72%">
      <stop offset="0%" stop-color="#241809"/>
      <stop offset="55%" stop-color="#120c06"/>
      <stop offset="100%" stop-color="#05030a"/>
    </radialGradient>
    <linearGradient id="stone" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3a2c1a"/>
      <stop offset="55%" stop-color="#241a10"/>
      <stop offset="100%" stop-color="#150e07"/>
    </linearGradient>
    <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${g}" stop-opacity="0.15"/>
      <stop offset="50%" stop-color="${gb}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${g}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <rect width="400" height="300" fill="url(#vault)"/>

  <!-- Arch behind the egg -->
  <path d="M92,232 L92,150 A108,108 0 0 1 308,150 L308,232"
        fill="none" stroke="${g}" stroke-width="1.6" opacity="0.28"/>
  <path d="M108,232 L108,152 A92,92 0 0 1 292,152 L292,232"
        fill="none" stroke="${g}" stroke-width="0.8" opacity="0.16"/>

  <!-- Seven-part seal, echoing the Sanctum -->
  <ellipse cx="200" cy="132" rx="96" ry="58" fill="none"
           stroke="${g}" stroke-width="0.9" opacity="0.22" stroke-dasharray="4 8"/>
  ${runes.join("\n  ")}

  <!-- Plinth -->
  <path d="M128,238 L272,238 L286,266 L114,266 Z" fill="url(#stone)"/>
  <path d="M114,266 L286,266 L292,282 L108,282 Z" fill="url(#stone)"/>
  <path d="M128,238 L272,238" stroke="url(#brass)" stroke-width="1.6"/>
  <path d="M114,266 L286,266" stroke="url(#brass)" stroke-width="1.2"/>
  <g opacity="0.3" stroke="${g}" stroke-width="0.7">
    <line x1="157" y1="238" x2="150" y2="266"/>
    <line x1="200" y1="238" x2="200" y2="266"/>
    <line x1="243" y1="238" x2="250" y2="266"/>
  </g>

  <!-- Carved sigil on the plinth face -->
  <g transform="translate(200 254)" opacity="0.55">
    <circle r="9" fill="none" stroke="${g}" stroke-width="1"/>
    <path d="M0,-5 a5,5 0 1,1 -0.01,0 M-2.4,3.2 L2.4,3.2 L1.4,9 L-1.4,9 Z"
          fill="${g}" opacity="0.8"/>
  </g>

  <!-- Motes -->
  <g fill="${gb}">
    <circle cx="128" cy="104" r="1.5" opacity="0.5"/>
    <circle cx="286" cy="86" r="1.2" opacity="0.4"/>
    <circle cx="96" cy="176" r="1" opacity="0.35"/>
    <circle cx="310" cy="170" r="1.6" opacity="0.45"/>
    <circle cx="168" cy="64" r="1" opacity="0.3"/>
    <circle cx="246" cy="58" r="1.3" opacity="0.35"/>
  </g>

  <!-- Floor pool of light under the plinth -->
  <ellipse cx="200" cy="284" rx="120" ry="14" fill="${g}" opacity="0.07"/>
</svg>`;
  }
  function hatcheryBackdropUrl(opts) {
    return `url("data:image/svg+xml,${encodeURIComponent(hatcheryBackdropSvg(opts))}")`;
  }
  function install5() {
    window.TQ = window.TQ || {};
    window.TQ.hatcheryBackdrop = hatcheryBackdropUrl;
    window.TQ.hatcheryBackdropSvg = hatcheryBackdropSvg;
  }

  // src/scan/identify.js
  var SCRYFALL = "https://api.scryfall.com";
  var NOT_A_NAME = [
    /^\s*$/,
    /^[\d\s/|.,:;'"*+\-—–]+$/,
    // pure numbers/punctuation
    /^(legendary\s+)?(creature|instant|sorcery|artifact|enchantment|land|planeswalker|battle|kindred|tribal)\b/i,
    /^(basic|snow|world)\s+(land|enchantment)/i,
    /\b(illus|illustrated by|artist)\b/i,
    /™|©|\bwizards of the coast\b|\bhasbro\b/i,
    /^\d+\s*\/\s*\d+$/,
    // power/toughness
    /^[A-Z]{2,6}\s*[•·]\s*[A-Z]{2}$/,
    // "MH3 • EN"
    /^\d{1,4}\s*\/\s*\d{1,4}\s*[A-Z]?$/,
    // collector number
    /^(NOT FOR SALE|PROXY)$/i,
    /^[WUBRGCXYZ0-9/{}()\[\]\s]{1,10}$/i
    // a bare mana cost
  ];
  function normaliseLine(s) {
    return String(s).replace(/[’‘`´]/g, "'").replace(/[—–]/g, "-").replace(/\s+/g, " ").trim();
  }
  function stripManaCost(name) {
    return name.replace(/\s*[({\[][WUBRGCXYZ0-9/]{1,6}[)}\]]\s*/gi, " ").replace(/\s+[WUBRGC0-9]{1,8}\s*$/i, "").trim();
  }
  function nameCandidates(lines, { imageHeight } = {}) {
    const items = lines.map((l, i) => typeof l === "string" ? { text: l, index: i } : __spreadProps(__spreadValues({}, l), { index: i })).map((l) => __spreadProps(__spreadValues({}, l), { text: normaliseLine(l.text) })).filter((l) => l.text.length >= 2 && l.text.length <= 40).filter((l) => !NOT_A_NAME.some((re) => re.test(l.text))).filter((l) => /[A-Za-z]/.test(l.text));
    const scored = items.map((l) => {
      let score = 0;
      if (l.box && imageHeight) {
        const rel = (l.box.y + (l.box.height || 0) / 2) / imageHeight;
        if (rel < 0.12) score += 60;
        else if (rel < 0.2) score += 40;
        else if (rel < 0.3) score += 10;
        else score -= 30;
      } else {
        score += Math.max(0, 24 - l.index * 8);
      }
      const words = l.text.split(" ");
      const capped = words.filter((w) => /^[A-Z]/.test(w)).length;
      if (capped / words.length > 0.6) score += 14;
      if (words.length <= 5) score += 8;
      if (l.text.length > 28) score -= 10;
      if (/[.:;]$/.test(l.text)) score -= 14;
      if (/\b(when|whenever|target|each|you may|enters|draw|destroy)\b/i.test(l.text)) score -= 25;
      return { text: stripManaCost(l.text), score };
    });
    const seen = /* @__PURE__ */ new Set();
    return scored.sort((a, b) => b.score - a.score).filter((c) => c.text && !seen.has(c.text.toLowerCase()) && seen.add(c.text.toLowerCase())).slice(0, 5);
  }
  function findPrinting(lines) {
    const text = lines.map((l) => normaliseLine(typeof l === "string" ? l : l.text));
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
  function norm2(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  }
  function similarity2(a, b) {
    a = norm2(a);
    b = norm2(b);
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
  var DIGIT_TO_LETTER = { 0: "O", 1: "l", 5: "S", 8: "B", 6: "G", 2: "Z" };
  var SWAP_CLASSES = ["tli1I", "oO0Q", "sS5", "bB8", "gG69", "cC(", "uUvV", "nNh", "eEc"];
  function variants(name, limit = 12) {
    const out = [name];
    const push = (v) => {
      if (v && v !== name && !out.includes(v) && out.length < limit) out.push(v);
    };
    push(name.replace(new RegExp("(?<=[A-Za-z])\\d|\\d(?=[A-Za-z])", "g"), (d) => DIGIT_TO_LETTER[d] || d));
    push(name.replace(/^\d/, (d) => DIGIT_TO_LETTER[d] || d));
    push(name.replace(/rn/g, "m"));
    const slots = [];
    for (let i = 1; i < name.length; i++) {
      const ch = name[i];
      if (!/[A-Za-z0-9]/.test(ch) || name[i - 1] === " ") continue;
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
  var sleep2 = (ms) => new Promise((r) => setTimeout(r, ms));
  var HEADERS2 = { Accept: "application/json", "User-Agent": "TokenQueen/2.0 (card scanner)" };
  async function getJson(url) {
    const r = await fetch(url, { headers: HEADERS2 });
    if (!r.ok) return null;
    const j = await r.json();
    return j && j.object === "error" ? null : j;
  }
  async function identify(lines, opts = {}) {
    const { imageHeight, minConfidence = 0.62 } = opts;
    const candidates = nameCandidates(lines, { imageHeight });
    const printing = findPrinting(lines);
    if (printing) {
      const card = await getJson(`${SCRYFALL}/cards/${printing.set}/${printing.number}`);
      await sleep2(110);
      if (card) {
        const agreement = candidates.length ? Math.max(...candidates.map((c) => similarity2(c.text, card.name))) : 0;
        if (!candidates.length || agreement >= 0.55) {
          return {
            card,
            confidence: candidates.length ? Math.max(0.9, agreement) : 0.8,
            via: "collector-number",
            uncertain: !candidates.length,
            alternatives: []
          };
        }
      }
    }
    const results = [];
    for (const cand of candidates.slice(0, 3)) {
      for (const v of variants(cand.text, 12)) {
        const card = await getJson(`${SCRYFALL}/cards/named?fuzzy=${encodeURIComponent(v)}`);
        await sleep2(110);
        if (!card) continue;
        const conf = similarity2(cand.text, card.name);
        results.push({ card, confidence: conf, via: "name", matched: cand.text });
        if (conf > 0.95) break;
      }
      if (results.some((r) => r.confidence > 0.95)) break;
    }
    if (!results.length) return null;
    results.sort((a, b) => b.confidence - a.confidence);
    const best = results[0];
    if (best.confidence < minConfidence) {
      return __spreadProps(__spreadValues({}, best), { uncertain: true, alternatives: results.slice(1, 4) });
    }
    return __spreadProps(__spreadValues({}, best), { alternatives: results.slice(1, 4).filter((r) => r.card.id !== best.card.id) });
  }
  function nameBands(lines, { gapFactor = 0.9 } = {}) {
    const boxed = lines.map((l) => typeof l === "string" ? { text: l } : l).filter((l) => l.box && l.box.height).map((l) => __spreadProps(__spreadValues({}, l), { text: normaliseLine(l.text) })).filter((l) => l.text && !NOT_A_NAME.some((re) => re.test(l.text))).sort((a, b) => a.box.y - b.box.y);
    if (boxed.length < 2) return [lines];
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
  async function identifyMany(lines, opts = {}) {
    const bands = nameBands(lines, opts);
    const out = [];
    for (const band of bands) {
      const stripped = band.map((l) => typeof l === "string" ? l : l.text);
      const result = await identify(stripped, __spreadProps(__spreadValues({}, opts), { imageHeight: void 0 }));
      if (result) out.push(result);
    }
    return out;
  }

  // src/scan/ocr.js
  function plugins() {
    const cap = window.Capacitor;
    return cap && cap.Plugins || {};
  }
  var INSTALL = [
    "npm i @capacitor/camera @jcesarmobile/capacitor-ocr",
    "npx cap sync android"
  ].join("\n");
  function available() {
    const p = plugins();
    return !!(p.Ocr || p.MlKitTextRecognition || p.CapacitorOcr);
  }
  function cameraAvailable() {
    return !!plugins().Camera;
  }
  async function capture() {
    const { Camera } = plugins();
    if (!Camera) throw new Error("Camera plugin not installed.");
    const photo = await Camera.getPhoto({
      quality: 88,
      allowEditing: false,
      resultType: "dataUrl",
      source: "CAMERA",
      correctOrientation: true,
      width: 1400
    });
    return { dataUrl: photo.dataUrl, path: photo.path };
  }
  async function recognise({ dataUrl, path }) {
    const p = plugins();
    if (p.Ocr && p.Ocr.process) {
      const res = await p.Ocr.process({ image: dataUrl || path });
      return flatten(res);
    }
    if (p.Ocr && p.Ocr.detectText) {
      const res = await p.Ocr.detectText({ filename: path });
      return (res.textDetections || []).map((d) => ({ text: d.text }));
    }
    if (p.MlKitTextRecognition) {
      const res = await p.MlKitTextRecognition.detectText({
        base64Image: (dataUrl || "").replace(/^data:image\/\w+;base64,/, "")
      });
      return flatten(res);
    }
    throw new Error("No OCR plugin installed.");
  }
  function flatten(res) {
    const out = [];
    const push = (text, frame) => {
      if (!text) return;
      const b = frame && (frame.boundingBox || frame.bounds || frame.frame || frame.cornerPoints);
      out.push(b && b.height != null ? { text, box: { x: b.x || b.left || 0, y: b.y || b.top || 0, width: b.width, height: b.height } } : { text });
    };
    const blocks = res.blocks || res.textBlocks || res.results || [];
    for (const block of blocks) {
      const lines = block.lines || [block];
      for (const line of lines) push(line.text, line);
    }
    if (!out.length && typeof res.text === "string") {
      res.text.split("\n").forEach((t) => push(t.trim()));
    }
    return out;
  }
  function imageHeightFrom(lines) {
    const ys = lines.filter((l) => l.box).map((l) => l.box.y + (l.box.height || 0));
    return ys.length ? Math.max(...ys) * 1.06 : void 0;
  }

  // src/scan/ui.js
  var C2 = {
    ink: "var(--tq-ink)",
    dim: "var(--tq-ink-dim)",
    faint: "var(--tq-ink-faint)",
    gold: "var(--tq-gold)",
    bright: "var(--tq-gold-bright)",
    warn: "var(--tq-danger)",
    panel: "var(--tq-surface)",
    deep: "var(--tq-surface-deep)",
    edge: "var(--tq-edge)"
  };
  var DISPLAY2 = "var(--tq-display)";
  var BODY2 = "var(--tq-text)";
  var MONO2 = "var(--tq-mono)";
  function el2(tag, style, ...kids) {
    const n = document.createElement(tag);
    Object.assign(n.style, style || {});
    for (const k of kids) if (k) n.append(k);
    return n;
  }
  function button(label, primary, onClick) {
    const b = el2("button", {
      minHeight: "var(--tq-tap)",
      padding: "0 16px",
      borderRadius: "4px",
      fontFamily: DISPLAY2,
      fontSize: "11px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      cursor: "pointer",
      border: "1px solid " + C2.edge,
      background: primary ? "linear-gradient(180deg, var(--tq-gold-bright), var(--tq-gold))" : "transparent",
      color: primary ? "#1a1208" : C2.dim
    }, label);
    b.onclick = onClick;
    return b;
  }
  function openScanner(onDone) {
    const found = [];
    let fanned = false;
    const overlay2 = el2("div", {
      position: "fixed",
      inset: "0",
      zIndex: "140",
      display: "flex",
      flexDirection: "column",
      background: "rgba(5,3,4,0.96)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    });
    const head = el2("div", {
      padding: "16px 16px 10px",
      textAlign: "center",
      borderBottom: "1px solid " + C2.edge
    });
    head.append(el2("div", {
      fontFamily: DISPLAY2,
      fontSize: "11px",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: C2.gold
    }, "Scan Cards"));
    const status = el2("div", {
      fontFamily: BODY2,
      fontSize: "14px",
      color: C2.dim,
      marginTop: "6px"
    }, "Point at a card and hold steady.");
    head.append(status);
    const modes = el2("div", { display: "flex", gap: "6px", marginTop: "10px", justifyContent: "center" });
    const modeBtn = (label, isFan) => {
      const b = el2("button", {
        minHeight: "34px",
        padding: "0 14px",
        borderRadius: "3px",
        cursor: "pointer",
        fontFamily: DISPLAY2,
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        border: "1px solid " + C2.edge,
        background: "transparent",
        color: C2.dim
      }, label);
      b.onclick = () => {
        fanned = isFan;
        [...modes.children].forEach((c) => {
          c.style.color = C2.dim;
          c.style.borderColor = C2.edge;
        });
        b.style.color = C2.bright;
        b.style.borderColor = "var(--tq-edge-strong)";
        status.textContent = isFan ? "Fan the pile so every title bar shows, then shoot once." : "Point at a card and hold steady.";
        status.style.color = C2.dim;
      };
      return b;
    };
    const single = modeBtn("One card", false);
    modes.append(single, modeBtn("Fanned pile", true));
    head.append(modes);
    single.style.color = C2.bright;
    single.style.borderColor = "var(--tq-edge-strong)";
    const list = el2("div", { flex: "1", overflowY: "auto", padding: "12px 16px" });
    const foot = el2("div", {
      padding: "12px 16px",
      display: "flex",
      gap: "8px",
      borderTop: "1px solid " + C2.edge
    });
    const render = () => {
      list.textContent = "";
      if (!found.length) {
        list.append(el2("p", {
          fontFamily: BODY2,
          fontSize: "14px",
          color: C2.faint,
          textAlign: "center",
          marginTop: "28px"
        }, "Nothing scanned yet."));
        return;
      }
      for (const entry of found) {
        const row = el2("div", {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "9px 0",
          borderBottom: "1px solid " + C2.edge
        });
        row.append(el2("span", { fontFamily: MONO2, fontSize: "13px", color: C2.gold, width: "26px" }, String(entry.qty)));
        row.append(el2("span", { fontFamily: BODY2, fontSize: "15px", color: C2.ink, flex: "1" }, entry.name));
        const rm = button("\xD7", false, () => {
          found.splice(found.indexOf(entry), 1);
          render();
        });
        Object.assign(rm.style, { minHeight: "34px", padding: "0 12px", fontSize: "15px" });
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
    const confirm = (result) => {
      const card = result.card;
      const box = el2("div", {
        margin: "10px 0 14px",
        padding: "12px",
        borderRadius: "4px",
        background: C2.panel,
        border: "1px solid " + (result.uncertain ? C2.warn : C2.edge)
      });
      box.append(el2("div", {
        fontFamily: DISPLAY2,
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: result.uncertain ? C2.warn : C2.gold
      }, result.uncertain ? "Not sure \u2014 is this right?" : "Found"));
      box.append(el2("div", { fontFamily: BODY2, fontSize: "17px", color: C2.ink, margin: "6px 0 2px" }, card.name));
      box.append(el2(
        "div",
        { fontFamily: MONO2, fontSize: "11px", color: C2.faint },
        `${(card.set || "").toUpperCase()} ${card.collector_number || ""} \xB7 ${Math.round(result.confidence * 100)}% \xB7 ${result.via}`
      ));
      const row = el2("div", { display: "flex", gap: "8px", marginTop: "10px" });
      row.append(button("Add", true, () => {
        add(card.name);
        box.remove();
      }));
      for (const alt of (result.alternatives || []).slice(0, 2)) {
        row.append(button(alt.card.name.slice(0, 18), false, () => {
          add(alt.card.name);
          box.remove();
        }));
      }
      row.append(button("Discard", false, () => box.remove()));
      box.append(row);
      list.prepend(box);
    };
    const scan = async () => {
      if (!available()) {
        status.textContent = "No OCR plugin installed on this build.";
        status.style.color = C2.warn;
        return;
      }
      try {
        status.textContent = fanned ? "Reading the pile\u2026" : "Reading\u2026";
        status.style.color = C2.dim;
        const shot = await capture();
        const lines = await recognise(shot);
        if (!lines.length) {
          status.textContent = "Could not read any text. Try more light, less angle.";
          status.style.color = C2.warn;
          return;
        }
        if (fanned) {
          status.textContent = "Matching\u2026";
          const results = await identifyMany(lines);
          if (!results.length) {
            status.textContent = "No cards matched. Spread the pile wider and try again.";
            status.style.color = C2.warn;
            return;
          }
          let added = 0;
          for (const r of results.reverse()) {
            if (r.uncertain || r.confidence < 0.8) confirm(r);
            else {
              add(r.card.name);
              added += 1;
            }
          }
          status.textContent = `${results.length} read, ${added} added straight off.`;
          status.style.color = C2.dim;
          return;
        }
        const result = await identify(lines, { imageHeight: imageHeightFrom(lines) });
        if (!result) {
          status.textContent = "Read the text but could not match a card. Try again or type it in.";
          status.style.color = C2.warn;
          return;
        }
        status.textContent = "Point at the next card.";
        status.style.color = C2.dim;
        confirm(result);
      } catch (err) {
        status.textContent = err.message || String(err);
        status.style.color = C2.warn;
      }
    };
    const close = (commit) => {
      overlay2.remove();
      if (commit && onDone) {
        onDone(found.map((f) => `${f.qty} ${f.name}`).join("\n"), found);
      }
    };
    foot.append(button("Done", true, () => close(true)));
    const scanBtn = button("Scan a card", false, scan);
    scanBtn.style.flex = "1";
    foot.prepend(scanBtn);
    foot.append(button("Cancel", false, () => close(false)));
    if (!available() || !cameraAvailable()) {
      status.textContent = "Scanning needs the camera and OCR plugins in this build.";
      status.style.color = C2.warn;
      const hint = el2("pre", {
        fontFamily: MONO2,
        fontSize: "11px",
        color: C2.faint,
        whiteSpace: "pre-wrap",
        marginTop: "10px",
        textAlign: "left"
      }, INSTALL);
      head.append(hint);
    }
    overlay2.append(head, list, foot);
    document.body.append(overlay2);
    render();
  }
  function install6() {
    window.TQ = window.TQ || {};
    window.TQ.openScanner = openScanner;
    window.TQ.identifyCard = identify;
  }

  // src/scan/live.js
  var TICK_MS = 900;
  var CONFIRM_MS = 1400;
  var REPEAT_LOCK_MS = 2500;
  var C3 = {
    ink: "var(--tq-ink)",
    dim: "var(--tq-ink-dim)",
    gold: "var(--tq-gold)",
    bright: "var(--tq-gold-bright)",
    warn: "var(--tq-danger)",
    edge: "var(--tq-edge)"
  };
  var DISPLAY3 = "var(--tq-display)";
  var BODY3 = "var(--tq-text)";
  var MONO3 = "var(--tq-mono)";
  function el3(tag, style, text) {
    const n = document.createElement(tag);
    Object.assign(n.style, style || {});
    if (text != null) n.textContent = text;
    return n;
  }
  function button2(label, primary, onClick) {
    const b = el3("button", {
      minHeight: "var(--tq-tap)",
      padding: "0 16px",
      borderRadius: "4px",
      fontFamily: DISPLAY3,
      fontSize: "11px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      cursor: "pointer",
      border: "1px solid " + C3.edge,
      background: primary ? "linear-gradient(180deg, var(--tq-gold-bright), var(--tq-gold))" : "rgba(5,3,4,0.7)",
      color: primary ? "#1a1208" : C3.ink
    }, label);
    b.onclick = onClick;
    return b;
  }
  async function openLiveScanner(onDone) {
    const found = [];
    let stream = null;
    let timer = null;
    let stopped = false;
    let pending = null;
    let pendingSince = 0;
    const recentlyAdded = /* @__PURE__ */ new Map();
    const overlay2 = el3("div", {
      position: "fixed",
      inset: "0",
      zIndex: "150",
      background: "#000",
      display: "flex",
      flexDirection: "column"
    });
    const stage = el3("div", { position: "relative", flex: "1", overflow: "hidden" });
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.autoplay = true;
    video.muted = true;
    Object.assign(video.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover"
    });
    stage.appendChild(video);
    const guide = el3("div", {
      position: "absolute",
      left: "50%",
      top: "46%",
      transform: "translate(-50%, -50%)",
      width: "74%",
      aspectRatio: "63 / 88",
      borderRadius: "10px",
      border: "2px solid " + C3.gold,
      boxShadow: "0 0 0 100vmax rgba(0,0,0,0.55)",
      pointerEvents: "none"
    });
    const band = el3("div", {
      position: "absolute",
      left: "4%",
      right: "4%",
      top: "4%",
      height: "13%",
      border: "1px dashed var(--tq-gold-bright)",
      borderRadius: "3px",
      background: "rgba(245,217,143,0.06)"
    });
    guide.appendChild(band);
    stage.appendChild(guide);
    const status = el3("div", {
      position: "absolute",
      left: "0",
      right: "0",
      bottom: "10px",
      textAlign: "center",
      fontFamily: BODY3,
      fontSize: "15px",
      color: C3.ink,
      textShadow: "0 1px 6px rgba(0,0,0,0.9)",
      padding: "0 16px"
    }, "Line the card name up inside the dashes.");
    stage.appendChild(status);
    const tally = el3("div", {
      position: "absolute",
      top: "max(12px, env(safe-area-inset-top))",
      left: "12px",
      fontFamily: MONO3,
      fontSize: "13px",
      color: C3.bright,
      background: "rgba(5,3,4,0.72)",
      padding: "6px 10px",
      borderRadius: "4px",
      border: "1px solid " + C3.edge
    }, "0 cards");
    stage.appendChild(tally);
    const last = el3("div", {
      position: "absolute",
      top: "max(12px, env(safe-area-inset-top))",
      right: "12px",
      left: "96px",
      textAlign: "right",
      fontFamily: BODY3,
      fontSize: "14px",
      color: C3.dim,
      textShadow: "0 1px 6px rgba(0,0,0,0.9)"
    }, "");
    stage.appendChild(last);
    const foot = el3("div", {
      display: "flex",
      gap: "8px",
      padding: "10px 12px",
      paddingBottom: "max(10px, env(safe-area-inset-bottom))",
      background: "#05030a",
      borderTop: "1px solid " + C3.edge
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    function grabBand() {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return null;
      const sRatio = stage.clientWidth / stage.clientHeight;
      const vRatio = vw / vh;
      let cw = vw, chh = vh, ox = 0, oy = 0;
      if (vRatio > sRatio) {
        cw = vh * sRatio;
        ox = (vw - cw) / 2;
      } else {
        chh = vw / sRatio;
        oy = (vh - chh) / 2;
      }
      const gw = cw * 0.74;
      const gh = gw * (88 / 63);
      const gx = ox + (cw - gw) / 2;
      const gy = oy + chh * 0.46 - gh / 2;
      const bx = gx + gw * 0.04;
      const by = gy + gh * 0.04;
      const bw = gw * 0.92;
      const bh = gh * 0.13;
      if (bw < 8 || bh < 4) return null;
      const scale = Math.min(3, Math.max(1, 900 / bw));
      canvas.width = Math.round(bw * scale);
      canvas.height = Math.round(bh * scale);
      ctx.drawImage(video, bx, by, bw, bh, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.85);
    }
    function setStatus(text, warn) {
      status.textContent = text;
      status.style.color = warn ? C3.warn : C3.ink;
    }
    function add(name) {
      const hit = found.find((f) => f.name.toLowerCase() === name.toLowerCase());
      if (hit) hit.qty += 1;
      else found.push({ name, qty: 1 });
      recentlyAdded.set(name.toLowerCase(), Date.now());
      tally.textContent = found.reduce((a, f) => a + f.qty, 0) + " cards";
      last.textContent = hit ? `${name} x${hit.qty}` : name;
      if (window.TQ && window.TQ.haptic) window.TQ.haptic(18);
      guide.animate(
        [{ borderColor: "var(--tq-gold-bright)" }, { borderColor: "#7fdc8a" }, { borderColor: "var(--tq-gold)" }],
        { duration: 500 }
      );
    }
    async function tick2() {
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
                setStatus("Next card\u2026");
              } else if (pending === name) {
                if (Date.now() - pendingSince >= CONFIRM_MS) {
                  add(name);
                  pending = null;
                  setStatus("Next card\u2026");
                } else {
                  setStatus(`${name}\u2026  hold still`);
                }
              } else {
                pending = name;
                pendingSince = Date.now();
                setStatus(`${name}\u2026  hold still`);
              }
            } else {
              pending = null;
              setStatus("Read the text but no match. Try a touch closer.");
            }
          } else {
            pending = null;
            setStatus("Line the card name up inside the dashes.");
          }
        }
      } catch (err) {
        setStatus(err.message || String(err), true);
      }
      timer = setTimeout(tick2, TICK_MS);
    }
    function close(commit) {
      stopped = true;
      clearTimeout(timer);
      if (stream) stream.getTracks().forEach((t) => t.stop());
      overlay2.remove();
      if (commit && onDone) {
        onDone(found.map((f) => `${f.qty} ${f.name}`).join("\n"), found);
      }
    }
    const doneBtn = button2("Done", true, () => close(true));
    const cancelBtn = button2("Cancel", false, () => close(false));
    doneBtn.style.flex = "1";
    foot.append(cancelBtn, doneBtn);
    overlay2.append(stage, foot);
    document.body.appendChild(overlay2);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return fallback(
        overlay2,
        foot,
        setStatus,
        close,
        "This build cannot open the camera in-app."
      );
    }
    if (!available()) {
      return fallback(
        overlay2,
        foot,
        setStatus,
        close,
        "No OCR plugin installed in this build."
      );
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      video.srcObject = stream;
      await video.play();
      timer = setTimeout(tick2, 600);
    } catch (err) {
      const msg = err && err.name === "NotAllowedError" ? "Camera permission was refused." : "Could not open the camera in-app.";
      return fallback(overlay2, foot, setStatus, close, msg);
    }
  }
  function fallback(overlay2, foot, setStatus, close, message) {
    setStatus(message + " Use single photos instead.", true);
    const b = button2("Photo mode", true, () => {
      close(false);
      if (window.TQ && window.TQ.openScanner) window.TQ.openScanner();
    });
    b.style.flex = "1";
    foot.prepend(b);
  }
  function install7() {
    window.TQ = window.TQ || {};
    window.TQ.openLiveScanner = openLiveScanner;
  }

  // src/sanctum/orbs.js
  var STYLE_ID = "tq-orb-style";
  function styles2() {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = `
    @keyframes tqOrbReject {
      0%   { transform: translateX(0);    filter: none; }
      15%  { transform: translateX(-5px); filter: hue-rotate(-40deg) brightness(1.5); }
      35%  { transform: translateX(5px);  filter: hue-rotate(-40deg) brightness(1.5); }
      55%  { transform: translateX(-3px); filter: hue-rotate(-40deg) brightness(1.2); }
      75%  { transform: translateX(3px);  filter: none; }
      100% { transform: translateX(0);    filter: none; }
    }
    body.tq-orb-reject .tq-orb { animation: tqOrbReject 420ms ease-out; }
    body.tq-orb-reject .tq-orb-rail {
      box-shadow: 0 0 18px var(--tq-danger);
      border-color: var(--tq-danger) !important;
    }
    @keyframes tqOrbAccept { 50% { transform: scale(1.18); } }
    body.tq-orb-accept .tq-orb:last-of-type { animation: tqOrbAccept 260ms ease-out; }
    @media (prefers-reduced-motion: reduce) {
      body.tq-orb-reject .tq-orb, body.tq-orb-accept .tq-orb:last-of-type { animation: none; }
    }
  `;
    document.head.appendChild(s);
  }
  var rejectTimer = null;
  function orbReject() {
    styles2();
    clearTimeout(rejectTimer);
    document.body.classList.remove("tq-orb-reject");
    void document.body.offsetWidth;
    document.body.classList.add("tq-orb-reject");
    rejectTimer = setTimeout(() => document.body.classList.remove("tq-orb-reject"), 460);
  }
  function orbAccept() {
    styles2();
    document.body.classList.add("tq-orb-accept");
    setTimeout(() => document.body.classList.remove("tq-orb-accept"), 280);
  }
  function install8() {
    styles2();
    window.TQ = window.TQ || {};
    window.TQ.orbReject = orbRejectCounted;
    window.TQ.orbAccept = orbAccept;
    window.TQ.orbResetHints = orbResetHints;
  }
  var rejects = 0;
  function nudge() {
    const existing = document.getElementById("tq-orb-nudge");
    if (existing) existing.remove();
    const n = document.createElement("div");
    n.id = "tq-orb-nudge";
    Object.assign(n.style, {
      position: "fixed",
      left: "50%",
      bottom: "14%",
      transform: "translateX(-50%)",
      zIndex: "126",
      maxWidth: "78%",
      padding: "9px 14px",
      borderRadius: "4px",
      background: "rgba(10,6,4,0.95)",
      border: "1px solid var(--tq-edge-strong)",
      fontFamily: "var(--tq-text)",
      fontSize: "14px",
      fontStyle: "italic",
      color: "var(--tq-ink-dim)",
      textAlign: "center",
      pointerEvents: "none",
      boxShadow: "0 4px 20px rgba(0,0,0,0.7)"
    });
    n.textContent = rejects >= 6 ? "the order every mana symbol is printed in" : "the order a card lists its colours";
    document.body.appendChild(n);
    n.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, fill: "forwards" });
    setTimeout(() => {
      n.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" }).onfinish = () => n.remove();
    }, 4200);
  }
  var baseReject = orbReject;
  function orbRejectCounted() {
    rejects += 1;
    baseReject();
    if (rejects === 3 || rejects === 6) setTimeout(nudge, 500);
  }
  function orbResetHints() {
    rejects = 0;
    const n = document.getElementById("tq-orb-nudge");
    if (n) n.remove();
  }

  // src/pet/life.js
  var STYLE_ID2 = "tq-petlife-style";
  var OVERLAY = "tq-pet-overlay";
  var host = null;
  var overlay = null;
  var bubble = null;
  var state = {};
  var idleTimer = null;
  var bubbleTimer = null;
  var breathing = null;
  var lastBubbleAt = 0;
  var LINES = {
    asleep: ["\u2026", "zzz", "dreaming of tokens"],
    starving: [
      "I could eat a Phyrexian.",
      "Feed me. Please.",
      "My stomach is making the noise again."
    ],
    hungry: ["Peckish.", "Is it feeding time?", "I smell nothing. This is a problem."],
    bored: [
      "Play with me?",
      "I have counted the stars twice.",
      "Something. Anything. Please."
    ],
    lonely: ["You were gone a while.", "I waited.", "Oh! You came back."],
    content: [
      "All is well.",
      "A good day.",
      "I like it here.",
      "Warm. Fed. Content."
    ],
    happy: [
      "Best day.",
      "I feel enormous.",
      "Did you see me? I was magnificent.",
      "More of this, please."
    ],
    petted: ["Mmm.", "Again.", "That is the good spot.", "Purring. Metaphorically."],
    fed: ["Delicious.", "Finally.", "Thank you.", "That will do nicely."],
    played: ["Again! Again!", "I win.", "Good game.", "That was fun."],
    grew: ["Something is different.", "I feel bigger.", "Look at me now."]
  };
  function pick(key, name) {
    const pool = LINES[key] || LINES.content;
    const line = pool[Math.floor(Math.random() * pool.length)];
    return name && Math.random() < 0.2 ? `${line}` : line;
  }
  function need(s) {
    if (s.asleep) return "asleep";
    if (s.hunger >= 90) return "starving";
    if (s.hunger >= 70) return "hungry";
    if (s.boredom >= 75) return "bored";
    if (s.awayHours >= 20) return "lonely";
    if (s.hunger < 25 && s.boredom < 25) return "happy";
    return "content";
  }
  function styles3() {
    if (document.getElementById(STYLE_ID2)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID2;
    s.textContent = `
    .${OVERLAY} {
      position: absolute; inset: 0; pointer-events: none;
      overflow: visible; z-index: 3;
    }
    .tq-pet-bubble {
      position: absolute; left: 50%; top: -6px;
      transform: translate(-50%, -100%) scale(0.9);
      max-width: 88%; padding: 7px 11px; border-radius: 4px;
      background: linear-gradient(180deg, rgba(36,24,9,0.97), rgba(10,6,4,0.97));
      border: 1px solid var(--tq-edge-strong);
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
      font-family: var(--tq-text); font-size: 14px; line-height: 1.35;
      color: var(--tq-ink); text-align: center;
      opacity: 0; transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,1.4,.4,1);
    }
    .tq-pet-bubble.on { opacity: 1; transform: translate(-50%, -100%) scale(1); }
    .tq-pet-bubble::after {
      content: ''; position: absolute; left: 50%; bottom: -5px;
      width: 8px; height: 8px; margin-left: -4px;
      background: rgba(10,6,4,0.97);
      border-right: 1px solid var(--tq-edge-strong);
      border-bottom: 1px solid var(--tq-edge-strong);
      transform: rotate(45deg);
    }
    .tq-pet-zzz {
      position: absolute; right: 8%; top: 8%;
      font-family: var(--tq-display); font-size: 15px;
      color: var(--tq-ink-dim); opacity: 0;
    }
    @keyframes tqZzz {
      0%   { opacity: 0; transform: translate(0,0) scale(0.7); }
      25%  { opacity: 0.9; }
      100% { opacity: 0; transform: translate(14px,-26px) scale(1.15); }
    }
    .tq-pet-spark {
      position: absolute; width: 6px; height: 6px; border-radius: 50%;
      background: var(--tq-gold-bright); pointer-events: none;
      box-shadow: 0 0 8px var(--tq-gold-bright);
    }
    @media (prefers-reduced-motion: reduce) {
      .tq-pet-bubble { transition: opacity 200ms ease; }
    }
  `;
    document.head.appendChild(s);
  }
  function breathe() {
    if (!canAnimate(host)) return;
    if (breathing) breathing.cancel();
    const s = state.asleep ? 1.4 : 1;
    breathing = host.animate(
      [
        { transform: "translateY(0) scale(1)" },
        { transform: `translateY(${state.asleep ? -1.5 : -3}px) scale(1.006)` },
        { transform: "translateY(0) scale(1)" }
      ],
      { duration: (state.asleep ? 5200 : 3400) * s, iterations: Infinity, easing: "ease-in-out" }
    );
  }
  function say(key, hold = 3600) {
    if (!bubble) return;
    bubble.textContent = pick(key, state.name);
    bubble.classList.add("on");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("on"), hold);
    lastBubbleAt = Date.now();
  }
  var canAnimate = (n) => !!(n && typeof n.animate === "function");
  function sparkle(count = 8) {
    if (!overlay || !canAnimate(overlay)) return;
    const rect = overlay.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "tq-pet-spark";
      d.style.left = `${20 + Math.random() * 60}%`;
      d.style.top = `${30 + Math.random() * 40}%`;
      overlay.appendChild(d);
      if (!canAnimate(d)) {
        d.remove();
        continue;
      }
      d.animate(
        [
          { transform: "translate(0,0) scale(0.4)", opacity: 0 },
          { opacity: 1, offset: 0.25 },
          {
            transform: `translate(${(Math.random() - 0.5) * rect.width * 0.5}px, ${-30 - Math.random() * 40}px) scale(1)`,
            opacity: 0
          }
        ],
        { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" }
      ).onfinish = () => d.remove();
    }
  }
  function zzz() {
    if (!overlay || !state.asleep) return;
    const z = document.createElement("div");
    z.className = "tq-pet-zzz";
    z.textContent = "z";
    overlay.appendChild(z);
    z.style.animation = "tqZzz 2600ms ease-out forwards";
    setTimeout(() => z.remove(), 2700);
  }
  function fidget() {
    if (!canAnimate(host) || state.asleep) return;
    const kind = Math.random();
    if (kind < 0.4) {
      host.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(1.4deg)" },
          { transform: "rotate(-1deg)" },
          { transform: "rotate(0deg)" }
        ],
        { duration: 900, easing: "ease-in-out" }
      );
    } else if (kind < 0.7) {
      host.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
        { duration: 700, easing: "ease-out" }
      );
    } else {
      host.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(3px)" },
          { transform: "translateX(-2px)" },
          { transform: "translateX(0)" }
        ],
        { duration: 800, easing: "ease-in-out" }
      );
    }
  }
  function tick() {
    if (!host || !document.body.contains(host)) return stop();
    if (state.asleep) {
      if (Math.random() < 0.7) zzz();
    } else {
      const n = need(state);
      const urgent = n === "starving" || n === "bored" || n === "lonely";
      const gap = Date.now() - lastBubbleAt;
      if (gap > (urgent ? 14e3 : 42e3) && Math.random() < (urgent ? 0.7 : 0.25)) say(n);
      else if (Math.random() < 0.45) fidget();
    }
    idleTimer = setTimeout(tick, 5e3 + Math.random() * 5e3);
  }
  function stop() {
    clearTimeout(idleTimer);
    clearTimeout(bubbleTimer);
    if (breathing) breathing.cancel();
    idleTimer = breathing = null;
  }
  function attach(el4, next) {
    if (!el4) return;
    styles3();
    const changedHost = el4 !== host;
    const wasAsleep = state.asleep;
    state = Object.assign({}, state, next || {});
    if (changedHost) {
      stop();
      host = el4;
      if (window.getComputedStyle(el4).position === "static") el4.style.position = "relative";
      overlay = el4.querySelector("." + OVERLAY);
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = OVERLAY;
        bubble = document.createElement("div");
        bubble.className = "tq-pet-bubble";
        overlay.appendChild(bubble);
        el4.appendChild(overlay);
      } else {
        bubble = overlay.querySelector(".tq-pet-bubble");
      }
      el4.addEventListener("click", onPoke);
      breathe();
      idleTimer = setTimeout(tick, 2500);
      if (state.awayHours >= 6 && !state.asleep) setTimeout(() => say("lonely"), 900);
    } else if (wasAsleep !== state.asleep) {
      breathe();
    }
  }
  function onPoke() {
    if (!host) return;
    if (state.asleep) {
      say("asleep", 2e3);
      return;
    }
    if (!canAnimate(host)) {
      say("petted", 2400);
      return;
    }
    host.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.94)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }
      ],
      { duration: 480, easing: "cubic-bezier(.3,1.5,.4,1)" }
    );
    sparkle(6);
    say("petted", 2400);
    if (window.TQ && window.TQ.haptic) window.TQ.haptic(12);
  }
  function celebrate(kind) {
    if (!host) return;
    sparkle(kind === "grew" ? 18 : 10);
    say(kind, 3e3);
    if (!canAnimate(host)) return;
    host.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
      { duration: kind === "grew" ? 900 : 560, easing: "ease-out" }
    );
  }
  function detach() {
    if (host) host.removeEventListener("click", onPoke);
    stop();
    host = overlay = bubble = null;
  }
  function install9() {
    window.TQ = window.TQ || {};
    window.TQ.petLife = attach;
    window.TQ.petCelebrate = celebrate;
    window.TQ.petDetach = detach;
  }

  // src/sanctum/backdrop.js
  function motes() {
    const g = "#c9a961";
    const out = [];
    let seed = 7;
    const rnd = () => (seed = seed * 1103515245 + 12345 & 2147483647) / 2147483647;
    for (let i = 0; i < 46; i++) {
      const x = (rnd() * 400).toFixed(1);
      const y = (rnd() * 700).toFixed(1);
      const r = (0.6 + rnd() * 1.8).toFixed(2);
      const o = (0.12 + rnd() * 0.4).toFixed(2);
      out.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${g}" opacity="${o}"/>`);
    }
    return out.join("");
  }
  function sanctumBackdropSvg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 700" width="400" height="700" preserveAspectRatio="xMidYMin slice">
  <defs>
    <radialGradient id="halo" cx="50%" cy="8%" r="62%">
      <stop offset="0%" stop-color="#c9a961" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="#c9a961" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#halo)"/>
  <g opacity="0.55">
    <path d="M40,660 L40,300 A160,160 0 0 1 360,300 L360,660"
          fill="none" stroke="#c9a961" stroke-width="1" opacity="0.10"/>
    <path d="M78,660 L78,314 A122,122 0 0 1 322,314 L322,660"
          fill="none" stroke="#c9a961" stroke-width="0.7" opacity="0.07"/>
  </g>
  ${motes()}
</svg>`;
  }
  function sanctumBackdropUrl() {
    return `url("data:image/svg+xml,${encodeURIComponent(sanctumBackdropSvg())}")`;
  }
  function install10() {
    window.TQ = window.TQ || {};
    window.TQ.sanctumBackdrop = sanctumBackdropUrl;
  }

  // src/main.js
  install();
  install2();
  install3();
  install4();
  install5();
  install6();
  install7();
  install8();
  install10();
  install9();
})();
