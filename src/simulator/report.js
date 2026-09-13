/** Aggregate simulation results into something you can act on. */

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const pct = (xs) => (100 * xs.filter(Boolean).length) / Math.max(1, xs.length);

function turnTo(results, n) {
  return mean(results.map((r) => {
    const i = r.landsByTurn.findIndex((v) => v >= n);
    return i < 0 ? 11 : i + 1;
  }));
}

export function deterministic(cards) {
  const lands = cards.filter((c) => c.isLand);
  const spells = cards.filter((c) => !c.isLand);
  const pips = {}, sources = {};
  for (const c of spells) for (const [k, v] of Object.entries(c.pips)) pips[k] = (pips[k] || 0) + v;
  for (const l of lands) for (const k of l.produces || []) sources[k] = (sources[k] || 0) + 1;
  for (const c of spells) if (c.ramp) for (const k of c.produces || []) sources[k] = (sources[k] || 0) + 1;
  return {
    lands: lands.length,
    nonbasic: lands.filter((l) => !l.types.includes('Basic')).length,
    taplands: lands.filter((l) => l.entersTapped).length,
    ramp: spells.filter((c) => c.ramp).length,
    draw: spells.filter((c) => c.draw).length,
    removal: spells.filter((c) => c.removal).length,
    wipes: spells.filter((c) => c.wipe).length,
    creatures: spells.filter((c) => c.types.includes('Creature')).length,
    avgMv: Math.round(mean(spells.map((c) => c.mv)) * 100) / 100,
    pips, sources,
    unknown: [...new Set(cards.filter((c) => c.unknown).map((c) => c.name))],
  };
}

export function karstenFlags(det) {
  const out = [];
  for (const [col, count] of Object.entries(det.pips).sort()) {
    const have = det.sources[col] || 0;
    const want = count <= 12 ? 19 : 27;
    if (have < want) out.push({ colour: col, have, pips: count, want });
  }
  return out;
}

export function summarise(name, cards, commander, results) {
  const det = deterministic(cards);
  const avail = Array.from({ length: 10 }, (_, t) => mean(results.map((r) => r.manaAvailable[t])));
  const spent = Array.from({ length: 10 }, (_, t) => mean(results.map((r) => r.manaSpent[t])));
  const eff = spent.map((s, i) => (avail[i] ? s / avail[i] : 0));
  const cmdBy = {};
  if (commander) for (const t of [3, 4, 5, 6]) cmdBy[t] = pct(results.map((r) => r.commanderTurn !== null && r.commanderTurn <= t));

  const cmdTurns = results.map((r) => r.commanderTurn).filter((x) => x);
  const s = {
    name, games: results.length, det,
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
    avail, spent, eff,
    effT3to6: mean(eff.slice(2, 6)),
    cardsCast: mean(results.map((r) => r.cardsCast)),
    hasCommander: !!commander,
    commander: commander ? commander.name : null,
  };
  s.score = consistencyScore(s);
  s.karsten = karstenFlags(det);
  return s;
}

export function consistencyScore(s) {
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const parts = [
    [25, clamp(s.keep7 / 85)],
    [20, clamp(1 - (s.t4Lands - 4) / 3)],
    [20, clamp(s.effT3to6 / 0.85)],
    [15, clamp(1 - s.screw / 40)],
    [10, clamp(1 - s.stuck / 25)],
    [10, s.hasCommander ? clamp(s.cmdBy[4] / 70) : 1],
  ];
  return Math.round(parts.reduce((a, [w, v]) => a + w * v, 0) * 10) / 10;
}
