/**
 * Commander Vault.
 *
 * Extracted verbatim from www/app.js, where it lived as compiled Babel output
 * with no source. The regular patterns (useState pairs, destructured props)
 * have been restored; the rest is untouched so the extraction is reviewable
 * against the original.
 *
 * Mounted by app.js through window.TQ.mountVault, the same seam the Reference
 * and Odds tabs use.
 */
import { _objectSpread, _toConsumableArray } from './helpers.js';

// Resolved at call time, not import time. Binding the hooks at module scope
// made the Vault silently dependent on modules.js loading after the React
// vendor script - true today, but a trap for whoever reorders index.html.
const React = window.React;
const useState = (...a) => window.React.useState(...a);
const useEffect = (...a) => window.React.useEffect(...a);

var COLORS = {
  W: {
    label: "White",
    symbol: "☀️",
    hex: "#F9FAF4",
    border: "#C8B560",
    text: "#5a4a00"
  },
  U: {
    label: "Blue",
    symbol: "💧",
    hex: "#0E68AB",
    border: "#3A8FC7",
    text: "#ffffff"
  },
  B: {
    label: "Black",
    symbol: "💀",
    hex: "#1A1A1A",
    border: "#6B6B6B",
    text: "#cccccc"
  },
  R: {
    label: "Red",
    symbol: "🔥",
    hex: "#D3202A",
    border: "#FF5050",
    text: "#ffffff"
  },
  G: {
    label: "Green",
    symbol: "🌲",
    hex: "#00733E",
    border: "#00A854",
    text: "#ffffff"
  },
  C: {
    label: "Colorless",
    symbol: "◇",
    hex: "#9A9A9A",
    border: "#C0C0C0",
    text: "#ffffff"
  }
};

// ─── All colour combinations ──────────────────────────────────────────────────
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

// ─── Strixhaven schools ───────────────────────────────────────────────────────
var STRIXHAVEN_SCHOOLS = [{
  id: "silverquill",
  name: "Silverquill",
  colors: ["W", "B"],
  colorId: "WB",
  motto: "Quill & Shadow",
  flavour: "Masters of rhetoric, poetry, and intimidation",
  crest: "✒️",
  gradient: ["#2a1f3d", "#c8b560"]
}, {
  id: "prismari",
  name: "Prismari",
  colors: ["U", "R"],
  colorId: "UR",
  motto: "Art Through Magic",
  flavour: "Elemental artists who paint with fire and water",
  crest: "🎨",
  gradient: ["#0e3d6b", "#c0392b"]
}, {
  id: "witherbloom",
  name: "Witherbloom",
  colors: ["B", "G"],
  colorId: "BG",
  motto: "Life from Death",
  flavour: "Grim biologists who harvest the essence of life",
  crest: "🌿",
  gradient: ["#0f2d1a", "#4a0a0a"]
}, {
  id: "lorehold",
  name: "Lorehold",
  colors: ["R", "W"],
  colorId: "WR",
  motto: "Discover the Past",
  flavour: "Archaeomancers who bring history to life",
  crest: "📜",
  gradient: ["#6b2a0e", "#c8a84b"]
}, {
  id: "quandrix",
  name: "Quandrix",
  colors: ["G", "U"],
  colorId: "UG",
  motto: "Math is Magic",
  flavour: "Mathematicians who study the patterns of nature",
  crest: "🔢",
  gradient: ["#0a3d1f", "#0e3d6b"]
}];

// ─── Initial deck data ────────────────────────────────────────────────────────
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
var nextId = function nextId(decks) {
  return Math.max.apply(Math, [0].concat(_toConsumableArray(decks.map(function (d) {
    return d.id;
  })))) + 1;
};
function exactColorMatch(deckColors, comboColors) {
  return comboColors.every(function (c) {
    return deckColors.includes(c);
  }) && deckColors.every(function (c) {
    return comboColors.includes(c);
  });
}

// ─── Colour pip ───────────────────────────────────────────────────────────────
function VaultColorPip(_ref19) {
  var c = _ref19.c,
    _ref19$size = _ref19.size,
    size = _ref19$size === void 0 ? 22 : _ref19$size;
  var col = COLORS[c];
  var letter = (c || 'C').toUpperCase();
  var primary = 'https://svgs.scryfall.io/card-symbols/' + letter + '.svg';
  var fallback = 'img/mana/' + letter + '.svg';
  return React.createElement("img", {
    src: primary,
    alt: '{' + letter + '}',
    title: col ? col.label : letter,
    onError: function onError(e) {
      if (e.currentTarget.dataset.tqFb === '1') return;
      e.currentTarget.dataset.tqFb = '1';
      e.currentTarget.src = fallback;
    },
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: '50%',
      boxShadow: '0 1px 4px rgba(0,0,0,0.5)'
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
  }, colors.map(function (c) {
    return React.createElement(VaultColorPip, {
      key: c,
      c: c
    });
  }));
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function CommanderVault() {
  // Load from localStorage, fall back to INITIAL_DECKS
  // Migration: if old vault data exists without v2 marker, offer to refresh
  const [decks, setDecks] = useState(function () {
      try {
        var saved = localStorage.getItem('tq_vault_decks');
        var version = localStorage.getItem('tq_vault_version');
        if (saved && version === 'v2') return JSON.parse(saved);
        if (saved && version !== 'v2') {
          // Preserve user-added decks (id > 100 or commander not in initial set)
          var initialNames = INITIAL_DECKS.map(function (d) { return d.commander.toLowerCase(); });
          var oldDecks = JSON.parse(saved);
          var userAdditions = oldDecks.filter(function (d) {
            return d.commander && initialNames.indexOf(d.commander.toLowerCase()) === -1;
          });
          localStorage.setItem('tq_vault_version', 'v2');
          return INITIAL_DECKS.concat(userAdditions);
        }
        localStorage.setItem('tq_vault_version', 'v2');
        return INITIAL_DECKS;
      } catch (_unused15) {
        return INITIAL_DECKS;
      }
    });

  // Save to localStorage whenever decks change
  useEffect(function () {
    try {
      localStorage.setItem('tq_vault_decks', JSON.stringify(decks));
    } catch (e) {
      console.warn('Failed to save vault decks:', e);
    }
  }, [decks]);
  const [view, setView] = useState("decks");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterColor, setFilterColor] = useState(null);
  var _tqSortInit = (function () { try { return localStorage.getItem('tq_vault_sort') || 'manual'; } catch (e) { return 'manual'; } })();
  const [sortMode, setSortModeRaw] = useState(_tqSortInit);
  var setSortMode = function setSortMode(m) {
    setSortModeRaw(m);
    try { localStorage.setItem('tq_vault_sort', m); } catch (e) {}
  };
  const [formCommander, setFormCommander] = useState("");
  const [formColors, setFormColors] = useState([]);
  const [formTheme, setFormTheme] = useState("");
  const [formList, setFormList] = useState("");
  var resetForm = function resetForm() {
    setFormCommander("");
    setFormColors([]);
    setFormTheme("");
    setFormList("");
  };
  var openAdd = function openAdd() {
    resetForm();
    setEditId(null);
    setShowAdd(true);
  };
  var openEdit = function openEdit(deck) {
    setFormCommander(deck.commander);
    setFormColors(_toConsumableArray(deck.colors));
    setFormTheme(deck.theme);
    setFormList(deck.list || "");
    setEditId(deck.id);
    setShowAdd(true);
  };
  var toggleFormColor = function toggleFormColor(c) {
    return setFormColors(function (prev) {
      return prev.includes(c) ? prev.filter(function (x) {
        return x !== c;
      }) : [].concat(_toConsumableArray(prev), [c]);
    });
  };
  var saveForm = function saveForm() {
    if (!formCommander.trim() || formColors.length === 0) return;
    if (editId) {
      setDecks(function (prev) {
        return prev.map(function (d) {
          return d.id === editId ? _objectSpread(_objectSpread({}, d), {}, {
            commander: formCommander.trim(),
            colors: formColors,
            theme: formTheme.trim(),
            list: formList.trim()
          }) : d;
        });
      });
    } else {
      setDecks(function (prev) {
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
  // The Odds tab calls back here with a score so the deck card can show it.
  useEffect(function () {
    window.TQ = window.TQ || {};
    window.TQ.recordDeckScore = function (deckId, score) {
      setDecks(function (prev) {
        return prev.map(function (d) {
          return d.id === deckId ? _objectSpread(_objectSpread({}, d), {}, { simScore: score }) : d;
        });
      });
    };
    return function () { delete window.TQ.recordDeckScore; };
  }, []);
  var deleteDeck = function deleteDeck(id) {
    return setDecks(function (prev) {
      return prev.filter(function (d) {
        return d.id !== id;
      });
    });
  };
  var coveredIds = new Set(ALL_COMBINATIONS.filter(function (combo) {
    return decks.some(function (d) {
      return exactColorMatch(d.colors, combo.colors);
    });
  }).map(function (c) {
    return c.id;
  }));
  var filtered = decks.filter(function (d) {
    var matchSearch = d.commander.toLowerCase().includes(search.toLowerCase()) || d.theme.toLowerCase().includes(search.toLowerCase());
    var matchColor = !filterColor || d.colors.includes(filterColor);
    return matchSearch && matchColor;
  });
  if (sortMode && sortMode !== 'manual' && window.TQ && window.TQ.sortDecks) {
    filtered = window.TQ.sortDecks(filtered, sortMode);
  }
  // The Vault used to carry its own palette - a cooler gold (#c8a84b) and a
  // grey muted (#6b6870) against the warm brown everything else uses. That
  // drift is why it read as a different app. Now it takes the shared tokens.
  var BG = "var(--tq-bg)";
  var SURFACE = "var(--tq-surface)";
  var SURFACE2 = "var(--tq-surface-raised)";
  var ACCENT = "var(--tq-gold)";
  var ACCENT2 = "#7b5ea7";
  var ACCENT_EDGE = "1px solid var(--tq-edge-strong)";
  var TEXT = "var(--tq-ink)";
  var MUTED = "var(--tq-ink-dim)";
  var tabs = [{
    id: "decks",
    label: "🃏 Decks"
  }, {
    id: "coverage",
    label: "🗺 Coverage"
  }, {
    id: "strixhaven",
    label: "🎓 Strixhaven"
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
  }, tabs.map(function (t) {
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
  }, ["W", "U", "B", "R", "G"].map(function (c) {
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
      // Live camera first; the photo flow is the fallback inside it.
      var open = window.TQ.openLiveScanner || window.TQ.openScanner;
      if (!open) return;
      open(function (text) {
        if (!text) return;
        // Drop straight into the new-deck form with the scanned list in place.
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
      var lines = filtered.map(function (d) {
        var colors = d.colors.join('');
        var tags = [d.theme, d.power && "Power ".concat(d.power), d.budget].filter(Boolean).join(' · ');
        return "\u2022 ".concat(d.commander, "  [").concat(colors || 'C', "]  \u2014 ").concat(tags);
      });
      var text = "=== TOKEN QUEEN \u2014 COMMANDER VAULT ===\n".concat(filtered.length, " deck").concat(filtered.length === 1 ? '' : 's', "\n\n") + lines.join('\n');
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(function () {});
      }
      alert('Deck list copied to clipboard');
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
      if (window.TQ && typeof window.TQ.openDeckImport === 'function') {
        window.TQ.openDeckImport(function (result) {
          var list = Array.isArray(result) ? result : [result];
          setDecks(function (prev) {
            var startId = nextId(prev);
            var newDecks = list.map(function (deck, i) {
              return {
                id: startId + i,
                commander: deck.commander,
                colors: deck.colors,
                theme: deck.theme || '',
                cards: deck.cards || []
              };
            });
            return [].concat(_toConsumableArray(prev), newDecks);
          });
          if (window.TQ && window.TQ.toast) {
            if (list.length === 1) window.TQ.toast('Added "' + list[0].commander + '" to your vault');
            else window.TQ.toast('Added ' + list.length + ' decks to your vault');
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
  }, "\u2B06 Import"), React.createElement("select", {
    value: sortMode,
    onChange: function onChange(e) { setSortMode(e.target.value); },
    title: "Sort decks",
    style: {
      padding: "10px 10px",
      borderRadius: 8,
      background: SURFACE,
      border: ACCENT_EDGE,
      color: ACCENT,
      fontFamily: "inherit",
      fontSize: 12,
      cursor: "pointer"
    }
  },
    React.createElement("option", { value: "manual" }, "Manual order"),
    React.createElement("option", { value: "alpha" }, "A → Z"),
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
  }, "No decks match your filter"), filtered.map(function (deck) {
    return React.createElement(VaultDeckCard, {
      key: deck.id,
      deck: deck,
      onEdit: function onEdit() {
        return openEdit(deck);
      },
      onDelete: function onDelete() {
        return deleteDeck(deck.id);
      },
      SURFACE: SURFACE,
      SURFACE2: SURFACE2,
      ACCENT: ACCENT,
      MUTED: MUTED,
      TEXT: TEXT
    });
  }))), view === "coverage" && React.createElement(VaultCoverageView, {
    decks: decks,
    coveredIds: coveredIds,
    SURFACE: SURFACE,
    SURFACE2: SURFACE2,
    ACCENT: ACCENT,
    ACCENT2: ACCENT2,
    MUTED: MUTED,
    TEXT: TEXT
  }), view === "strixhaven" && React.createElement(VaultStrixhavenView, {
    decks: decks,
    SURFACE: SURFACE,
    SURFACE2: SURFACE2,
    ACCENT: ACCENT,
    MUTED: MUTED,
    TEXT: TEXT
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
  }, ["W", "U", "B", "R", "G", "C"].map(function (c) {
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
  }, "Paste an export here, or scan cards in, and the deck can be simulated from its card."),
  React.createElement("button", {
    onClick: function () {
      if (window.TQ && window.TQ.openScanner) {
        window.TQ.openScanner(function (text) {
          if (text) setFormList(function (prev) { return prev ? prev + "\n" + text : text; });
        });
      }
    },
    style: {
      marginTop: 8, minHeight: "var(--tq-tap)", padding: "0 14px",
      borderRadius: 4, background: "transparent", cursor: "pointer",
      border: "1px solid var(--tq-edge-strong)", color: "var(--tq-gold)",
      fontFamily: "var(--tq-display)", fontSize: 11, letterSpacing: "0.16em",
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

// ─── Deck card ────────────────────────────────────────────────────────────────
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
      return setExpanded(function (e) {
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
  }, "Identity: "), deck.colors.map(function (c, idx) {
    return React.createElement("span", {
      key: c,
      style: { display: "inline-flex", alignItems: "center", gap: 4, marginRight: idx < deck.colors.length - 1 ? 8 : 0 }
    },
      React.createElement(VaultColorPip, { c: c, size: 14 }),
      React.createElement("span", null, COLORS[c].label)
    );
  }), deck.theme && React.createElement(React.Fragment, null, " \xB7 ", React.createElement("span", {
    style: {
      fontStyle: "italic"
    }
  }, deck.theme))), React.createElement("div", {
    style: { display: "flex", flexWrap: "wrap", gap: 6 }
  },
    React.createElement("button", {
      onClick: function () {
        if (window.TQ && window.TQ.copyDeckToClipboard) {
          window.TQ.copyDeckToClipboard({
            commander: deck.commander,
            theme: deck.theme,
            colors: deck.colors,
            cards: deck.cards || []
          }).then(function () {
            if (window.TQ && window.TQ.toast) window.TQ.toast('Deck copied to clipboard');
          });
        }
      },
      style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: ACCENT_EDGE, background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
    }, "📋 Export"),
    React.createElement("button", {
      onClick: function () {
        if (window.TQ && window.TQ.validateDeck) window.TQ.validateDeck(deck);
      },
      style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: ACCENT_EDGE, background: "transparent", color: ACCENT, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
    }, "✓ Validate"),
    React.createElement("button", {
      onClick: function () { if (window.TQ && window.TQ.openInMoxfield) window.TQ.openInMoxfield(deck.commander); },
      style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #553a99", background: "transparent", color: "#9a8acf", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
    }, "Moxfield"),
    React.createElement("button", {
      onClick: function () { if (window.TQ && window.TQ.openInEDHREC) window.TQ.openInEDHREC(deck.commander); },
      style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #993a3a", background: "transparent", color: "#cf8a8a", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
    }, "EDHREC"),
    React.createElement("button", {
      onClick: function () { if (window.TQ && window.TQ.openInScryfall) window.TQ.openInScryfall(deck.commander); },
      style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid #3a6a99", background: "transparent", color: "#8aaacf", fontFamily: "inherit", fontSize: 11, cursor: "pointer" }
    }, "Scryfall"),
    React.createElement("button", {
      onClick: function () {
        if (window.TQ && window.TQ.runOddsFor) window.TQ.runOddsFor(deck);
      },
      disabled: !deck.list,
      title: deck.list ? "Simulate this deck" : "Add a deck list in Edit to simulate this deck",
      style: { padding: "0 14px", minHeight: "var(--tq-tap)", borderRadius: 6, border: "1px solid " + (deck.list ? "var(--tq-edge-strong)" : "var(--tq-edge)"), background: "transparent", color: deck.list ? ACCENT : "#555", fontFamily: "inherit", fontSize: 11, cursor: deck.list ? "pointer" : "not-allowed" }
    }, deck.simScore != null ? "Odds \u00b7 " + deck.simScore : "Odds"),
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

// ─── Coverage view ────────────────────────────────────────────────────────────
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
  var pct = Math.round(covered / total * 100);
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
  }, covered, " / ", total, " \xB7 ", pct, "%")), React.createElement("div", {
    style: {
      height: 8,
      background: "#2a2a32",
      borderRadius: 4,
      overflow: "hidden"
    }
  }, React.createElement("div", {
    style: {
      height: "100%",
      width: "".concat(pct, "%"),
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
  }, total - covered, " combinations still uncovered \u2014 lots of room to grow! \uD83C\uDF31")), groups.map(function (group) {
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
    }, group.ids.map(function (id) {
      var combo = ALL_COMBINATIONS.find(function (c) {
        return c.id === id;
      });
      var have = coveredIds.has(id);
      var matchDecks = decks.filter(function (d) {
        return exactColorMatch(d.colors, combo.colors);
      });
      return React.createElement("div", {
        key: id,
        title: have ? matchDecks.map(function (d) {
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
      }, combo.colors.map(function (c) {
        return React.createElement(VaultColorPip, {
          key: c,
          c: c,
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

// ─── Strixhaven view ──────────────────────────────────────────────────────────
function VaultStrixhavenView({ decks, SURFACE, SURFACE2, ACCENT, MUTED, TEXT }) {
  var covered = STRIXHAVEN_SCHOOLS.filter(function (school) {
    return decks.some(function (d) {
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
  }, "\uD83C\uDF93 Arcavios University"), React.createElement("h2", {
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
  }, covered === 5 ? "Complete! 🎉" : "Schools"))), React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 16
    }
  }, STRIXHAVEN_SCHOOLS.map(function (school) {
    var have = decks.some(function (d) {
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
  }, STRIXHAVEN_SCHOOLS.map(function (school) {
    var matchDecks = decks.filter(function (d) {
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
    }, "\"", school.motto, "\"")), React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, school.colors.map(function (c) {
      return React.createElement(VaultColorPip, {
        key: c,
        c: c,
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
    }, school.colors.map(function (c) {
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
    }, "\u2713 Enrolled"), matchDecks.map(function (d) {
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
export { CommanderVault, VaultDeckCard, VaultCoverageView, VaultStrixhavenView, COLORS, ALL_COMBINATIONS, STRIXHAVEN_SCHOOLS, INITIAL_DECKS };
