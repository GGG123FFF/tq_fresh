/**
 * Simulator tab UI.
 *
 * Written with React.createElement rather than JSX because the app has no JSX
 * compile step — app.js is committed as Babel output. This file is real source
 * and gets bundled by build.js, which is the pattern the rest of the app should
 * move to.
 *
 * Palette and type are Token Queen's own: parchment ink on near-black, Cinzel
 * for tracked labels, Crimson Pro for reading, JetBrains Mono for figures.
 */
import { simulate } from './index.js';

const h = () => window.React.createElement;

// Shared tokens - see src/theme/tokens.js.
const C = {
  bg: 'var(--tq-bg)',
  panel: 'var(--tq-panel)',
  edge: 'var(--tq-edge)',
  ink: 'var(--tq-ink)',
  dim: 'var(--tq-ink-dim)',
  faint: 'var(--tq-ink-faint)',
  gold: 'var(--tq-gold-deep)',
  goldBright: 'var(--tq-gold-bright)',
  warn: 'var(--tq-danger)',
};

const DISPLAY = 'var(--tq-display)';
const BODY = 'var(--tq-text)';
const MONO = 'var(--tq-mono)';

const PIP = { W: '#f8f0d8', U: '#a8cce8', B: '#9a8fa0', R: '#e89a86', G: '#9dc4a0' };
const PIP_NAME = { W: 'White', U: 'Blue', B: 'Black', R: 'Red', G: 'Green' };

/* ── pieces ────────────────────────────────────────────────────────────── */

function Label(text) {
  const e = h();
  return e('div', {
    style: {
      fontFamily: DISPLAY, fontSize: 11, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: C.dim, marginBottom: 8,
    },
  }, text);
}

function Stat(key, label, value, warn) {
  const e = h();
  return e('div', {
    key,
    style: {
      padding: '11px 12px', borderRadius: 4,
      background: C.panel, border: `1px solid ${C.edge}`,
    },
  },
  e('div', {
    style: {
      fontFamily: MONO, fontSize: 19, fontWeight: 700, lineHeight: 1.1,
      color: warn ? C.warn : C.goldBright,
    },
  }, value),
  e('div', {
    style: {
      fontFamily: DISPLAY, fontSize: 11, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: C.dim, marginTop: 5,
    },
  }, label));
}

/**
 * The one loud element on the tab: mana you had against mana you spent.
 * It's the reading that most often explains why a deck feels bad.
 */
function ManaCurve(avail, spent) {
  const e = h();
  const max = Math.max.apply(null, avail.concat([1]));
  return e('div', {
    style: { display: 'flex', alignItems: 'flex-end', gap: 5, height: 128 },
  }, avail.slice(0, 8).map((a, i) => {
    const s = spent[i];
    const eff = a ? s / a : 0;
    return e('div', {
      key: i,
      style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 },
    },
    e('div', {
      style: { position: 'relative', width: '100%', height: 100, display: 'flex', alignItems: 'flex-end' },
    },
    e('div', {
      style: {
        width: '100%', height: `${(a / max) * 100}%`,
        background: 'rgba(201, 169, 97, 0.13)', borderRadius: '2px 2px 0 0',
      },
    }),
    e('div', {
      style: {
        position: 'absolute', bottom: 0, width: '100%', height: `${(s / max) * 100}%`,
        background: eff < 0.6
          ? 'linear-gradient(180deg, #c9705a 0%, rgba(201,112,90,0.55) 100%)'
          : 'linear-gradient(180deg, #f5d98f 0%, rgba(201,169,97,0.5) 100%)',
        borderRadius: '2px 2px 0 0',
      },
    })),
    e('div', {
      style: { fontFamily: MONO, fontSize: 11, color: C.faint },
    }, `T${i + 1}`));
  }));
}

function CommanderOdds(cmdBy, avgTurn) {
  const e = h();
  const cells = [3, 4, 5, 6].map((t) => e('div', {
    key: t,
    style: {
      flex: 1, textAlign: 'center', padding: '9px 2px', borderRadius: 4,
      background: C.panel, border: `1px solid ${C.edge}`,
    },
  },
  e('div', {
    style: {
      fontFamily: MONO, fontSize: 15, fontWeight: 700,
      color: t === 4 && cmdBy[4] < 70 ? C.warn : C.goldBright,
    },
  }, `${Math.round(cmdBy[t])}%`),
  e('div', {
    style: { fontFamily: DISPLAY, fontSize: 11, letterSpacing: '0.12em', color: C.dim, marginTop: 4 },
  }, `BY T${t}`)));

  if (avgTurn) {
    cells.push(e('div', {
      key: 'avg',
      style: {
        flex: 1, textAlign: 'center', padding: '9px 2px', borderRadius: 4,
        background: C.panel, border: `1px solid ${C.edge}`,
      },
    },
    e('div', { style: { fontFamily: MONO, fontSize: 15, fontWeight: 700, color: C.ink } }, avgTurn.toFixed(1)),
    e('div', {
      style: { fontFamily: DISPLAY, fontSize: 11, letterSpacing: '0.12em', color: C.dim, marginTop: 4 },
    }, 'AVERAGE')));
  }
  return e('div', { style: { display: 'flex', gap: 6 } }, cells);
}

function Section(key, title, note, body) {
  const e = h();
  return e('section', { key, style: { marginTop: 26 } },
    Label(title),
    note && e('p', {
      style: {
        fontFamily: BODY, fontSize: 13.5, lineHeight: 1.55, color: C.dim,
        margin: '-4px 0 12px', maxWidth: '60ch',
      },
    }, note),
    body);
}

/* ── main component ────────────────────────────────────────────────────── */

export function SimulatorTab(props) {
  const React = window.React;
  const e = React.createElement;
  const { useState, useCallback } = React;

  const games = props.games || 10000;
  const [text, setText] = useState(props.initialList || '');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState(props.initialSummary || null);
  const [error, setError] = useState(null);
  const [deck, setDeck] = useState(props.initialDeck || null);
  // At a four-player table you are on the draw three games in four, so the
  // on-the-play figure is the optimistic one. Worth being able to see both.
  const [onDraw, setOnDraw] = useState(false);

  // The Vault's Odds button hands a deck over and jumps to this tab.
  React.useEffect(() => {
    const onDeck = (ev) => {
      const d = ev.detail;
      if (!d || !d.list) return;
      setDeck(d);
      setText(d.list);
      setSummary(null);
      setError(null);
    };
    window.addEventListener('tq:sim-deck', onDeck);
    return () => window.removeEventListener('tq:sim-deck', onDeck);
  }, []);

  const runSim = useCallback(async () => {
    setError(null);
    setBusy(true);
    setProgress(0);
    if (props.haptic) props.haptic(15);
    try {
      const s = await simulate(text, {
        games,
        store: props.store,
        name: deck ? deck.commander : undefined,
        commander: deck ? deck.commander : undefined,
        on_draw: onDraw,
        onProgress: (done, total) => setProgress(done / total),
      });
      setSummary(s);
      if (deck && window.TQ && window.TQ.recordDeckScore) {
        window.TQ.recordDeckScore(deck.id, s.score);
      }
      if (props.onResult) props.onResult(s);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setBusy(false);
    }
  }, [text, games, props, deck, onDraw]);

  const s = summary;
  const kids = [];

  if (deck) {
    kids.push(e('div', {
      key: 'from',
      style: {
        marginBottom: 12, padding: '9px 12px', borderRadius: 4,
        background: C.panel, border: `1px solid ${C.edge}`,
        fontFamily: BODY, fontSize: 14, color: C.ink,
      },
    }, `Simulating ${deck.commander}`,
    e('button', {
      onClick: () => { setDeck(null); setText(''); setSummary(null); },
      style: {
        marginLeft: 10, padding: '0 8px', minHeight: 'var(--tq-tap)',
        background: 'none', border: 'none',
        fontFamily: DISPLAY, fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: C.dim, cursor: 'pointer',
      },
    }, 'Clear')));
  }

  kids.push(e('p', {
    key: 'intro',
    style: {
      fontFamily: BODY, fontSize: 14.5, lineHeight: 1.6, color: C.dim,
      margin: '0 0 14px', maxWidth: '60ch',
    },
  }, `Plays the deck ${games.toLocaleString()} times against no opponent to see how reliably it finds its mana and gets its spells down. It measures consistency, not power.`));

  kids.push(e('textarea', {
    key: 'input',
    value: text,
    onChange: (ev) => setText(ev.target.value),
    placeholder: 'Paste a deck list\n\nCommander (1)\n1 Grimgrin, Corpse-Born\n\nDeck (99)\n1 Sol Ring\n14 Swamp',
    spellCheck: false,
    className: 'tq-search-wrap',
    style: {
      width: '100%', minHeight: 128, padding: 11,
      fontFamily: MONO, fontSize: 12, lineHeight: 1.5,
      color: C.ink, background: 'rgba(0,0,0,0.35)',
      border: `1px solid ${C.edge}`, borderRadius: 4, resize: 'vertical',
    },
  }));

  // Scanning straight into the simulator, for when you just want to rate a
  // pile of cards without filing it as a deck first.
  kids.push(e('button', {
    key: 'scan',
    onClick: () => {
      const open = window.TQ && (window.TQ.openLiveScanner || window.TQ.openScanner);
      if (open) {
        open((scanned) => {
          if (scanned) setText((prev) => (prev ? prev + '\n' + scanned : scanned));
        });
      }
    },
    style: {
      marginTop: 10, width: '100%', minHeight: 'var(--tq-tap)',
      borderRadius: 4, cursor: 'pointer', background: 'transparent',
      border: `1px solid ${C.edge}`, color: C.dim,
      fontFamily: DISPLAY, fontSize: 11, letterSpacing: '0.16em',
      textTransform: 'uppercase',
    },
  }, 'Scan cards in'));

  kids.push(e('div', {
    key: 'onplay',
    style: { display: 'flex', gap: 6, marginTop: 10 },
  }, [false, true].map((v) => e('button', {
    key: String(v),
    onClick: () => setOnDraw(v),
    style: {
      flex: 1, minHeight: 38, borderRadius: 4, cursor: 'pointer',
      fontFamily: DISPLAY, fontSize: 10, letterSpacing: '0.14em',
      textTransform: 'uppercase', background: 'transparent',
      border: `1px solid ${onDraw === v ? 'var(--tq-edge-strong)' : C.edge}`,
      color: onDraw === v ? C.goldBright : C.dim,
    },
  }, v ? 'On the draw' : 'On the play'))));

  kids.push(e('button', {
    key: 'run',
    onClick: runSim,
    disabled: busy || !text.trim(),
    className: 'active:scale-95 transition-all',
    style: {
      marginTop: 10, width: '100%', minHeight: 'var(--tq-tap)', padding: '13px 16px',
      fontFamily: DISPLAY, fontSize: 11, fontWeight: 700,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: '#1a1208',
      background: 'linear-gradient(180deg, #f5d98f 0%, #c9a961 100%)',
      border: 'none', borderRadius: 4,
      opacity: busy || !text.trim() ? 0.45 : 1,
    },
  }, busy ? `Simulating ${Math.round(progress * 100)}%` : 'Run simulation'));

  if (error) {
    kids.push(e('div', {
      key: 'err',
      role: 'alert',
      style: {
        marginTop: 12, padding: '11px 12px', borderRadius: 4,
        background: 'rgba(201, 112, 90, 0.08)', border: `1px solid ${C.warn}`,
        fontFamily: BODY, fontSize: 14, color: C.ink,
      },
    }, error));
  }

  if (s && !busy) {
    kids.push(Section('consistency', 'Consistency', null,
      e('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(104px, 1fr))', gap: 7 },
      },
      Stat('score', 'Score', String(s.score), false),
      Stat('keep', 'Keep on seven', `${s.keep7.toFixed(0)}%`, s.keep7 < 85),
      Stat('t4', 'Turn to 4 lands', s.t4Lands.toFixed(1), s.t4Lands > 5.4),
      Stat('screw', 'Colour screw', `${s.screw.toFixed(0)}%`, s.screw > 8),
      Stat('stuck', 'Short by T4', `${s.stuck.toFixed(0)}%`, s.stuck > 18),
      Stat('flood', 'Flooded', `${s.flood.toFixed(0)}%`, false))));

    kids.push(Section('mana', 'Mana used against mana available',
      `Gold is what the deck actually spent. Turns three to six average ${(s.effT3to6 * 100).toFixed(0)}% — below about seventy means the curve and the mana base disagree.`,
      ManaCurve(s.avail, s.spent)));

    if (s.hasCommander) {
      kids.push(Section('cmd', `Casting ${s.commander}`, null,
        CommanderOdds(s.cmdBy, s.avgCmdTurn)));
    }

    if (s.karsten.length) {
      kids.push(Section('karsten', 'Colour sources look light',
        'Counted against the coloured pips the deck is asking for.',
        e('div', null, s.karsten.map((k) => e('div', {
          key: k.colour,
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0', borderBottom: `1px solid ${C.edge}`,
          },
        },
        e('span', {
          style: {
            width: 16, height: 16, borderRadius: 8, flexShrink: 0,
            background: PIP[k.colour], boxShadow: `0 0 8px ${PIP[k.colour]}55`,
          },
        }),
        e('span', { style: { fontFamily: BODY, fontSize: 14, color: C.ink } },
          `${PIP_NAME[k.colour]}: ${k.have} sources for ${k.pips} pips — around ${k.want} would be comfortable`))))));
    }

    kids.push(Section('list', "What's in the list", null,
      e('div', {
        style: { fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: C.dim },
      },
      `${s.det.lands} lands (${s.det.nonbasic} nonbasic, ${s.det.taplands} enter tapped), ${s.det.creatures} creatures, average mana value ${s.det.avgMv}`,
      e('br', null),
      `${s.det.ramp} ramp · ${s.det.draw} draw · ${s.det.removal} removal · ${s.det.wipes} board wipes`)));

    const notes = [];
    if (s.totalCards !== 100) notes.push(`${s.totalCards} cards, not 100.`);
    if (s.guessedCommander) notes.push(`No commander was marked, so ${s.commander} was used.`);
    Object.keys(s.fuzzyCorrections).forEach((asked) => {
      notes.push(`Read “${asked}” as ${s.fuzzyCorrections[asked].name}.`);
    });
    if (s.unresolved.length) {
      notes.push(`Couldn’t find ${s.unresolved.join(', ')} — counted as generic three-drops.`);
    }
    if (notes.length) {
      kids.push(Section('check', 'Worth checking', null,
        e('ul', {
          style: { margin: 0, paddingLeft: 18, fontFamily: BODY, fontSize: 14, lineHeight: 1.7, color: C.ink },
        }, notes.map((n, i) => e('li', { key: i }, n)))));
    }
  }

  return e('div', { style: { padding: '16px 14px 90px', color: C.ink } }, kids);
}

/**
 * Mount point matching the seam the Reference tab already uses:
 * app.js calls window.TQ.mountSimulator(el).
 */
export function install() {
  const roots = new WeakMap();
  window.TQ = window.TQ || {};

  /** Called by the Vault's Odds button. */
  window.TQ.runOddsFor = function (deck) {
    if (!deck || !deck.list) return;
    window.TQ._pendingDeck = deck;
    window.dispatchEvent(new CustomEvent('tq:sim-deck', { detail: deck }));
    if (typeof window.TQ.setTab === 'function') window.TQ.setTab('odds');
  };

  window.TQ.mountSimulator = function (el) {
    if (!el || roots.has(el)) return;
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    if (!React || !ReactDOM) return;

    const store = {
      get: async (k) => {
        try {
          const v = localStorage.getItem(`tq_scry:${k}`);
          return v ? JSON.parse(v) : undefined;
        } catch (_) { return undefined; }
      },
      set: async (k, v) => {
        try { localStorage.setItem(`tq_scry:${k}`, JSON.stringify(slim(v))); } catch (_) {}
      },
    };

    const props = {
      store,
      games: 10000,
      haptic: window.TQ.haptic,
      onResult: (s) => {
        try { localStorage.setItem('tq_last_sim', JSON.stringify(s)); } catch (_) {}
      },
      initialSummary: readLast(),
      initialDeck: window.TQ._pendingDeck || null,
    };

    const root = ReactDOM.createRoot
      ? ReactDOM.createRoot(el)
      : { render: (node) => ReactDOM.render(node, el) };
    roots.set(el, root);
    root.render(React.createElement(SimulatorTab, props));
  };
}

/** Scryfall cards are chunky; keep only the fields the engine reads. */
function slim(card) {
  if (!card || typeof card !== 'object') return card;
  const keep = ['name', 'cmc', 'mana_cost', 'type_line', 'oracle_text', 'produced_mana'];
  const out = {};
  for (const k of keep) if (card[k] !== undefined) out[k] = card[k];
  if (card.card_faces) {
    out.card_faces = card.card_faces.map((f) => {
      const g = {};
      for (const k of keep) if (f[k] !== undefined) g[k] = f[k];
      return g;
    });
  }
  return out;
}

function readLast() {
  try {
    const v = localStorage.getItem('tq_last_sim');
    return v ? JSON.parse(v) : null;
  } catch (_) { return null; }
}
