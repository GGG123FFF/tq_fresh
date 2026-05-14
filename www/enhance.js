/* eslint-disable */
/**
 * Token Queen runtime enhancements.
 * Loaded BEFORE app.js. Does three things:
 *
 *   1. Replaces the in-app OFFLINE_TOKEN_POOL Scryfall URLs with a hybrid loader
 *      that tries fresh Scryfall data, falls back to bundled SVGs.
 *   2. Adds a global <img> onerror fallback so any broken token art swaps to
 *      its local SVG instead of showing a broken icon.
 *   3. Injects a counter info popup so tapping a counter pip shows the official
 *      Scryfall counter card art (or bundled fallback) with artist attribution.
 *
 * Scryfall image policy: when displaying art_crop, the artist name must appear
 * in the same interface. The popup includes this.
 */
(function () {
  'use strict';

  var SCRYFALL_API = 'https://api.scryfall.com';
  var UA_HEADERS = { 'Accept': 'application/json' };

  // ---------- 1. Bundled fallback manifest (must match gen-svg-fallbacks.js) ----------
  // Note: Scryfall has no official "Oil Counter" card, so oil is SVG-only.
  var FALLBACKS = {
    counters: {
      energy:     { local: 'img/counters/energy.svg',     set: 'tmh3', cn: '36', name: 'Energy Reserve' },
      poison:     { local: 'img/counters/poison.svg',     set: 'tone', cn: '14', name: 'Poison Counter' },
      experience: { local: 'img/counters/experience.svg', set: 'ttdc', cn: '34', name: 'Experience' },
      oil:        { local: 'img/counters/oil.svg',        set: null,   cn: null, name: 'Oil Counter' },
      rad:        { local: 'img/counters/rad.svg',        set: 'tpip', cn: '22', name: 'Rad Counter' }
    },
    tokens: {
      goblin:    { local: 'img/tokens/goblin.svg',    query: '!"Goblin" t:token pow=1 tou=1' },
      soldier:   { local: 'img/tokens/soldier.svg',   query: '!"Soldier" t:token pow=1 tou=1' },
      zombie:    { local: 'img/tokens/zombie.svg',    query: '!"Zombie" t:token pow=2 tou=2' },
      dragon:    { local: 'img/tokens/dragon.svg',    query: '!"Dragon" t:token pow=5 tou=5' },
      angel:     { local: 'img/tokens/angel.svg',     query: '!"Angel" t:token pow=4 tou=4' },
      wolf:      { local: 'img/tokens/wolf.svg',      query: '!"Wolf" t:token pow=2 tou=2' },
      elemental: { local: 'img/tokens/elemental.svg', query: '!"Elemental" t:token' },
      saproling: { local: 'img/tokens/saproling.svg', query: '!"Saproling" t:token' },
      spirit:    { local: 'img/tokens/spirit.svg',    query: '!"Spirit" t:token pow=1 tou=1' },
      bird:      { local: 'img/tokens/bird.svg',      query: '!"Bird" t:token pow=1 tou=1' },
      insect:    { local: 'img/tokens/insect.svg',    query: '!"Insect" t:token pow=1 tou=1' },
      thopter:   { local: 'img/tokens/thopter.svg',   query: '!"Thopter" t:token pow=1 tou=1' }
    }
  };

  // Memory-game token id mapping: app uses tok001..tok012 in order matching our keys.
  var MEMORY_ID_MAP = {
    tok001: 'goblin',
    tok002: 'soldier',
    tok003: 'zombie',
    tok004: 'dragon',
    tok005: 'angel',
    tok006: 'wolf',
    tok007: 'elemental',
    tok008: 'saproling',
    tok009: 'spirit',
    tok010: 'bird',
    tok011: 'insect',
    tok012: 'thopter'
  };

  // Counter id mapping: app uses 'energy'|'poison'|'experience' etc directly.
  // Expose globally so app code can call window.TQ.openCounterCard('poison')
  window.TQ = window.TQ || {};
  window.TQ.FALLBACKS = FALLBACKS;
  window.TQ.MEMORY_ID_MAP = MEMORY_ID_MAP;

  // ---------- 2. Hybrid art resolver (24h cache in localStorage) ----------
  var CACHE_KEY = 'tq_scryfall_art_cache_v1';
  var CACHE_TTL = 24 * 60 * 60 * 1000;

  function loadCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function saveCache(c) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch (e) {}
  }
  function cacheGet(key) {
    var c = loadCache();
    var entry = c[key];
    if (!entry) return null;
    if (Date.now() - entry.t > CACHE_TTL) return null;
    return entry.v;
  }
  function cacheSet(key, value) {
    var c = loadCache();
    c[key] = { t: Date.now(), v: value };
    saveCache(c);
  }

  function fetchJSON(url) {
    return fetch(url, { headers: UA_HEADERS })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }

  // Resolve a counter to { art, artist, name, scryfall_uri }
  // Tries Scryfall, falls back to local SVG with no artist.
  function resolveCounter(id) {
    var spec = FALLBACKS.counters[id];
    if (!spec) return Promise.reject(new Error('unknown counter ' + id));
    var cacheKey = 'counter:' + id;
    var cached = cacheGet(cacheKey);
    if (cached) return Promise.resolve(cached);

    // No Scryfall card exists for this counter (e.g. oil) — go straight to local
    if (!spec.set || !spec.cn) {
      var localResult = { art: spec.local, artist: null, name: spec.name, scryfall_uri: null, set_name: null, source: 'local' };
      cacheSet(cacheKey, localResult);
      return Promise.resolve(localResult);
    }

    return fetchJSON(SCRYFALL_API + '/cards/' + spec.set + '/' + spec.cn)
      .then(function (card) {
        var result = {
          art: (card.image_uris && card.image_uris.art_crop) || spec.local,
          artist: card.artist || null,
          name: card.name || spec.name,
          scryfall_uri: card.scryfall_uri || null,
          set_name: card.set_name || null,
          source: 'scryfall'
        };
        cacheSet(cacheKey, result);
        return result;
      })
      .catch(function () {
        return { art: spec.local, artist: null, name: spec.name, scryfall_uri: null, set_name: null, source: 'local' };
      });
  }

  // Resolve a memory token id (tok001 etc) to { art, name, artist }
  function resolveMemoryToken(memId) {
    var key = MEMORY_ID_MAP[memId];
    if (!key) return Promise.resolve(null);
    var spec = FALLBACKS.tokens[key];
    var cacheKey = 'token:' + key;
    var cached = cacheGet(cacheKey);
    if (cached) return Promise.resolve(cached);

    return fetchJSON(SCRYFALL_API + '/cards/search?q=' + encodeURIComponent(spec.query) + '&unique=art&order=released&dir=desc')
      .then(function (r) {
        var card = r.data && r.data[0];
        if (!card) throw new Error('no result');
        var art_crop = (card.image_uris && card.image_uris.art_crop) ||
                       (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris && card.card_faces[0].image_uris.art_crop);
        if (!art_crop) throw new Error('no art_crop');
        var result = { art: art_crop, name: card.name, artist: card.artist || null, source: 'scryfall' };
        cacheSet(cacheKey, result);
        return result;
      })
      .catch(function () {
        return { art: spec.local, name: key.charAt(0).toUpperCase() + key.slice(1) + ' Token', artist: null, source: 'local' };
      });
  }

  window.TQ.resolveCounter = resolveCounter;
  window.TQ.resolveMemoryToken = resolveMemoryToken;

  // ---------- 3. Global <img> error fallback ----------
  // If any cards.scryfall.io image fails, swap to the local SVG.
  // We match on the alt text or src pattern.
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    // Already swapped? Bail.
    if (t.dataset.tqFallback === '1') return;
    var src = t.getAttribute('src') || '';
    var alt = (t.getAttribute('alt') || '').toLowerCase();

    // Memory game token name → local fallback
    var bundled = null;
    var tokens = FALLBACKS.tokens;
    Object.keys(tokens).forEach(function (k) {
      if (alt.indexOf(k) !== -1) bundled = tokens[k].local;
    });

    if (bundled) {
      t.dataset.tqFallback = '1';
      t.setAttribute('src', bundled);
      console.log('[TQ] Image fallback:', alt, '->', bundled);
    }
  }, true);

  // ---------- 4. Counter card popup ----------
  function openCounterCard(id) {
    // Vibrate if possible
    if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}

    var existing = document.getElementById('tq-counter-card-modal');
    if (existing) existing.remove();

    var modal = document.createElement('div');
    modal.id = 'tq-counter-card-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Counter card');
    modal.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:200', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:24px',
      'background:rgba(5,3,10,0.92)', 'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)', 'animation:tqFadeIn 0.2s ease-out'
    ].join(';');

    modal.innerHTML = [
      '<style>',
      '@keyframes tqFadeIn { from { opacity: 0 } to { opacity: 1 } }',
      '@keyframes tqCardIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }',
      '.tq-card-frame { animation: tqCardIn 0.3s ease-out; max-width: 320px; width: 100%; border-radius: 12px; overflow: hidden; border: 2px solid #c9a961; box-shadow: 0 0 40px rgba(201, 169, 97, 0.3), 0 8px 32px rgba(0,0,0,0.7); background: #15100a; }',
      '.tq-card-art { width: 100%; aspect-ratio: 5/7; background: #05030a; object-fit: cover; display: block; }',
      '.tq-card-attr { padding: 12px 14px; font-family: Cinzel, serif; color: #c9a961; font-size: 11px; letter-spacing: 0.1em; text-align: center; border-top: 1px solid rgba(201,169,97,0.3); }',
      '.tq-card-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.18em; }',
      '.tq-card-artist { color: #9a8765; font-style: italic; font-size: 10px; }',
      '.tq-card-source { color: #6a5a42; font-size: 9px; margin-top: 6px; opacity: 0.7; }',
      '.tq-close-x { position: absolute; top: 12px; right: 12px; width: 36px; height: 36px; border-radius: 50%; background: rgba(10,6,4,0.85); border: 1px solid rgba(201,169,97,0.4); color: #c9a961; font-family: Cinzel, serif; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }',
      '</style>',
      '<button class="tq-close-x" aria-label="Close">&times;</button>',
      '<div class="tq-card-frame">',
        '<img class="tq-card-art" alt="Loading counter art" src="" />',
        '<div class="tq-card-attr">',
          '<div class="tq-card-name">Loading...</div>',
          '<div class="tq-card-artist">&nbsp;</div>',
          '<div class="tq-card-source">&nbsp;</div>',
        '</div>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    function close() { if (modal.parentNode) modal.parentNode.removeChild(modal); }
    modal.querySelector('.tq-close-x').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    var escHandler = function (e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);

    resolveCounter(id).then(function (data) {
      var img = modal.querySelector('.tq-card-art');
      var nameEl = modal.querySelector('.tq-card-name');
      var artistEl = modal.querySelector('.tq-card-artist');
      var sourceEl = modal.querySelector('.tq-card-source');
      img.alt = data.name;
      img.src = data.art;
      img.onerror = function () {
        var spec = FALLBACKS.counters[id];
        if (spec && img.src !== spec.local) img.src = spec.local;
      };
      nameEl.textContent = data.name;
      artistEl.innerHTML = data.artist
        ? 'Illus. ' + escapeHtml(data.artist) + (data.set_name ? ' &middot; ' + escapeHtml(data.set_name) : '')
        : 'Token Queen';
      sourceEl.textContent = data.source === 'scryfall'
        ? 'Card image \u00a9 Wizards of the Coast \u00b7 via Scryfall'
        : 'Themed placeholder';
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  window.TQ.openCounterCard = openCounterCard;

  // ---------- 5. Auto-attach: find counter pip buttons and make them tappable ----------
  // The app renders counter pips with emoji glyphs (\u2620 poison, \u26A1 energy, etc).
  // We delegate clicks on the <span> showing the count: tapping it (not the +/-)
  // opens the card. We use the existing emoji as the identifier.
  var EMOJI_TO_COUNTER = {
    '\u2620': 'poison',   // skull
    '\u26A1': 'energy',   // lightning bolt
    'XP': 'experience',
    'OIL': 'oil',
    'RAD': 'rad'
  };

  // Inject a small counter icon next to each pip span so it's always visible.
  function decorateCounterSpan(span) {
    if (span.dataset.tqDecorated === '1') return;
    var text = (span.textContent || '').trim();
    var counterId = null;
    for (var ch in EMOJI_TO_COUNTER) {
      if (text.indexOf(ch) === 0) { counterId = EMOJI_TO_COUNTER[ch]; break; }
    }
    if (!counterId) return;
    var spec = FALLBACKS.counters[counterId];
    if (!spec) return;

    span.dataset.tqDecorated = '1';
    span.style.cursor = 'pointer';
    span.setAttribute('aria-label', spec.name + ' counter, tap for card');

    var icon = document.createElement('img');
    icon.src = spec.local;
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');
    icon.style.cssText = 'width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;border-radius:2px;border:1px solid rgba(201,169,97,0.3);object-fit:cover;flex-shrink:0';

    // Try upgrading to real Scryfall art in background
    resolveCounter(counterId).then(function (data) {
      if (data && data.art) icon.src = data.art;
    });

    span.insertBefore(icon, span.firstChild);
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    // The counter span sits between two buttons inside a flex container.
    var span = t.tagName === 'SPAN' ? t : t.closest('span');
    if (!span) return;
    var text = span.textContent || '';
    // Identify counter by leading character
    for (var ch in EMOJI_TO_COUNTER) {
      if (text.indexOf(ch) === 0 || text.trim().indexOf(ch) === 0) {
        // Ignore taps that landed on a +/- button
        if (t.tagName === 'BUTTON') return;
        e.stopPropagation();
        openCounterCard(EMOJI_TO_COUNTER[ch]);
        return;
      }
    }
  }, true);

  // ---------- 6. Memory game image hardening ----------
  // After app boots, the OFFLINE_TOKEN_POOL data is baked in. We use a
  // MutationObserver to spot memory-game images as they mount and rewrite
  // their src to use our resolver.
  function patchMemoryImage(img) {
    if (img.dataset.tqPatched === '1') return;
    var alt = (img.getAttribute('alt') || '').toLowerCase();
    // Match memory game tokens by alt text
    var matchedKey = null;
    Object.keys(FALLBACKS.tokens).forEach(function (k) {
      if (alt === k || alt.indexOf(k) !== -1) matchedKey = k;
    });
    if (!matchedKey) return;

    img.dataset.tqPatched = '1';
    img.onerror = function () {
      if (img.dataset.tqFinalFallback === '1') return;
      img.dataset.tqFinalFallback = '1';
      img.src = FALLBACKS.tokens[matchedKey].local;
    };

    // Try fresh Scryfall art (cached) instead of the stale hardcoded URL
    var memId = null;
    Object.keys(MEMORY_ID_MAP).forEach(function (k) {
      if (MEMORY_ID_MAP[k] === matchedKey) memId = k;
    });
    if (!memId) return;
    resolveMemoryToken(memId).then(function (data) {
      if (data && data.art && img.dataset.tqFinalFallback !== '1') {
        img.src = data.art;
      }
    });
  }

  var observer = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes && m.addedNodes.forEach(function (n) {
        if (n.nodeType !== 1) return;
        if (n.tagName === 'IMG') patchMemoryImage(n);
        else if (n.tagName === 'SPAN') decorateCounterSpan(n);
        else if (n.querySelectorAll) {
          n.querySelectorAll('img').forEach(patchMemoryImage);
          n.querySelectorAll('span').forEach(decorateCounterSpan);
        }
      });
    });
  });

  // Wait for body to exist
  function startObserver() {
    if (!document.body) { setTimeout(startObserver, 30); return; }
    observer.observe(document.body, { childList: true, subtree: true });
    // Catch elements already present
    document.querySelectorAll('img').forEach(patchMemoryImage);
    document.querySelectorAll('span').forEach(decorateCounterSpan);
  }
  startObserver();

  // ---------- 10. Dragon flight music — Hoots-Force-inspired chiptune ----------
  // Original composition in the spirit of Gloryhammer-style power-metal:
  // heroic minor key, galloping eighth-note bass, soaring lead.
  // Not a copy of any actual song — just the *vibe*.
  // Key: A minor. Tempo: 132 BPM (≈ 454ms per quarter note).
  var dragonMusicState = { ctx: null, timeoutIds: [], started: false, muted: false };

  // Note frequencies (12-TET, A4 = 440)
  function noteFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }
  // MIDI shortcuts (A minor pentatonic + neighbours): A=57 C=60 D=62 E=64 G=67
  var A3 = 57, B3 = 59, C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67,
      A4 = 69, B4 = 71, C5 = 72, D5 = 74, E5 = 76, F5 = 77, G5 = 79, A5 = 81;

  function scheduleNote(ctx, when, midi, dur, type, vol, attack) {
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type || 'square';
    o.frequency.value = noteFreq(midi);
    var atk = attack || 0.005;
    g.gain.setValueAtTime(0.0001, ctx.currentTime + when);
    g.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + when + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + when + dur);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + when);
    o.stop(ctx.currentTime + when + dur + 0.05);
  }

  // Schedule one 8-bar loop (16 beats). Returns total length in seconds.
  function scheduleDragonLoop(ctx, startOffset) {
    var BPM = 132;
    var beat = 60 / BPM;       // quarter note
    var half = beat * 2;
    var eighth = beat / 2;
    var sixteenth = beat / 4;
    var t = startOffset;

    // ---- BASS: galloping eighth notes (root-fifth pattern) ----
    // Chord progression: Am - F - C - G  (i - VI - III - VII — classic heroic)
    var chords = [
      { root: A3, fifth: E4 }, // Am
      { root: F4 - 12, fifth: C4 }, // F  (F2 -> C3 implied)
      { root: C4, fifth: G4 },  // C
      { root: G4 - 12, fifth: D4 }  // G
    ];
    for (var c = 0; c < chords.length; c++) {
      var ch = chords[c];
      for (var i = 0; i < 8; i++) {
        // Galloping: root, root, fifth, root pattern
        var note = (i % 4 === 2) ? ch.fifth : ch.root;
        scheduleNote(ctx, t + i * eighth, note, eighth * 0.9, 'triangle', 0.10);
      }
      t += beat * 4;
    }

    // ---- LEAD: heroic melodic phrase ----
    // Reset t to start of bar
    t = startOffset;
    // Bar 1-2 (Am): rising A minor pentatonic flourish
    var phrase1 = [
      [E5, eighth], [A5, eighth], [G5, eighth], [E5, eighth],
      [A5, beat],   [G5, eighth], [E5, eighth],
      [D5, beat],   [E5, half + eighth]
    ];
    // Bar 3-4 (F-C): descending
    var phrase2 = [
      [F5, eighth],   [E5, eighth], [D5, eighth], [C5, eighth],
      [F5, beat],     [E5, half],
      [G5, eighth],   [E5, eighth], [C5, eighth], [G4, eighth],
      [C5, half + beat]
    ];
    // Bar 5-6 (C-G): climbing triumphant
    var phrase3 = [
      [C5, eighth], [E5, eighth], [G5, eighth], [C5 + 12 /*C6*/, eighth],
      [B4 + 12 /*B5*/, beat], [A5, half],
      [G5, eighth], [A5, eighth], [B4 + 12, eighth], [D5 + 12 /*D6*/, eighth],
      [E5 + 12 /*E6*/, half + beat]
    ];
    // Bar 7-8 (Am resolve): triumphant landing
    var phrase4 = [
      [A5, beat], [G5, eighth], [E5, eighth],
      [A5, beat], [E5, eighth], [G5, eighth],
      [F5, eighth], [E5, eighth], [D5, eighth], [C5, eighth],
      [A4, beat + half]
    ];

    function playPhrase(phrase, atTime) {
      var pt = atTime;
      for (var i = 0; i < phrase.length; i++) {
        var n = phrase[i];
        scheduleNote(ctx, pt, n[0], Math.min(n[1] * 0.95, n[1]), 'square', 0.08);
        // Octave-up sparkle layer at lower volume for power-metal sheen
        scheduleNote(ctx, pt, n[0] + 12, Math.min(n[1] * 0.95, n[1]), 'triangle', 0.04);
        pt += n[1];
      }
    }

    playPhrase(phrase1, startOffset);
    playPhrase(phrase2, startOffset + beat * 4);
    playPhrase(phrase3, startOffset + beat * 8);
    playPhrase(phrase4, startOffset + beat * 12);

    return beat * 16; // 8 bars of 4/4 in seconds
  }

  window.TQ.startDragonMusic = function () {
    var ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(function () {});
    dragonMusicState.ctx = ctx;
    dragonMusicState.started = true;

    // Schedule loops back-to-back; reschedule before each runs out
    function scheduleNextLoop(offsetFromNow) {
      if (!dragonMusicState.started) return;
      var loopLen = scheduleDragonLoop(ctx, offsetFromNow);
      // Reschedule 500ms before the loop ends
      var nextMs = Math.max(100, (offsetFromNow + loopLen - 0.5) * 1000);
      var id = setTimeout(function () {
        scheduleNextLoop(0.5); // small overlap to avoid gap
      }, nextMs);
      dragonMusicState.timeoutIds.push(id);
    }
    scheduleNextLoop(0.1);
  };

  window.TQ.stopDragonMusic = function () {
    dragonMusicState.started = false;
    dragonMusicState.timeoutIds.forEach(function (id) { clearTimeout(id); });
    dragonMusicState.timeoutIds = [];
    // Notes already scheduled will play out their tails — that's fine, ~half a beat.
  };

  console.log('[TQ] Enhancements loaded.');

  // ---------- 11. Mana symbol helper ----------
  // Returns a Scryfall CDN URL for a mana symbol, with local SVG fallback.
  // Symbols: W, U, B, R, G, C (and generic 0-20, X, Y, Z, but we only bundle WUBRGC fallbacks).
  var SCRYFALL_SYMBOL_BASE = 'https://svgs.scryfall.io/card-symbols/';
  var LOCAL_SYMBOL_BASE = 'img/mana/';
  var BUNDLED_SYMBOLS = { W: 1, U: 1, B: 1, R: 1, G: 1, C: 1 };

  window.TQ.manaSymbolUrl = function (sym) {
    // Strip braces if passed as "{W}"
    var clean = String(sym).replace(/[{}]/g, '').toUpperCase();
    return SCRYFALL_SYMBOL_BASE + clean + '.svg';
  };

  window.TQ.manaSymbolFallback = function (sym) {
    var clean = String(sym).replace(/[{}]/g, '').toUpperCase();
    if (BUNDLED_SYMBOLS[clean]) return LOCAL_SYMBOL_BASE + clean + '.svg';
    return null;
  };

  // Render an <img> for a single mana symbol with hybrid loading
  window.TQ.createManaImg = function (sym, size, classNameOrStyle) {
    var img = document.createElement('img');
    img.src = window.TQ.manaSymbolUrl(sym);
    img.alt = '{' + sym + '}';
    img.width = size || 16;
    img.height = size || 16;
    img.style.display = 'inline-block';
    img.style.verticalAlign = 'middle';
    img.style.borderRadius = '50%';
    img.style.boxShadow = '0 1px 2px rgba(0,0,0,0.5)';
    if (classNameOrStyle && typeof classNameOrStyle === 'object') {
      Object.assign(img.style, classNameOrStyle);
    }
    var fb = window.TQ.manaSymbolFallback(sym);
    if (fb) {
      img.onerror = function () {
        if (img.dataset.tqMfb === '1') return;
        img.dataset.tqMfb = '1';
        img.src = fb;
      };
    }
    return img;
  };

  // ---------- 12. Rules fetcher with offline cache ----------
  // Sources:
  //   Comprehensive: scraped from magic.wizards.com/en/rules
  //   Commander:     mtgcommander.net rules page
  //   Format briefs: bundled in this file (Brawl, 1v1, 2HG, ban-list quick ref)
  var RULES_CACHE_KEY = 'tq_rules_cache_v1';
  var RULES_CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

  function rulesCacheGet(key) {
    try {
      var all = JSON.parse(localStorage.getItem(RULES_CACHE_KEY) || '{}');
      var entry = all[key];
      if (!entry || Date.now() - entry.t > RULES_CACHE_TTL) return null;
      return entry.v;
    } catch (e) { return null; }
  }
  function rulesCacheSet(key, value) {
    try {
      var all = JSON.parse(localStorage.getItem(RULES_CACHE_KEY) || '{}');
      all[key] = { t: Date.now(), v: value };
      localStorage.setItem(RULES_CACHE_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  // Fetch raw text from a URL
  function fetchText(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    });
  }

  // Get the current comp-rules download URL from Wizards' rules page
  function discoverCompRulesUrl() {
    return fetchText('https://magic.wizards.com/en/rules').then(function (html) {
      // The download link pattern: media.wizards.com/.../MagicCompRules%20YYYYMMDD.txt
      var m = html.match(/href="(https:\/\/media\.wizards\.com\/[^"]+MagicCompRules[^"]+\.txt)"/i);
      return m ? m[1] : null;
    });
  }

  // Bundled summaries — short, curated, never go stale
  // For formats with no clean text-file source, we ship a concise summary.
  var BUNDLED_FORMAT_RULES = {
    commander_intro: {
      title: 'Commander (EDH) — Quick Reference',
      body: [
        'Commander is a multiplayer format built around a 100-card singleton deck led by a legendary creature (your commander).',
        '',
        'CORE RULES',
        '- Deck size: exactly 100 cards including your commander.',
        '- Singleton: only one of each non-basic card (cards with "A deck can have any number..." text excepted).',
        '- Colour identity: every mana symbol on every card in the 99 must be present in your commander\'s colour identity.',
        '- Starting life: 40.',
        '- Commander damage: a player who has taken 21+ combat damage from a single commander loses the game.',
        '- Commander tax: each time your commander would go to the command zone, you may move it there. Casting from the command zone costs an additional {2} per previous cast.',
        '- Mulligan: London Mulligan (draw 7, optionally redraw fewer; on N+1 mulligan put N cards on bottom).',
        '',
        'For full official rules see mtgcommander.net.'
      ].join('\n')
    },
    onevsone_commander: {
      title: '1v1 Commander',
      body: [
        '1v1 Commander is multiplayer Commander adapted for two-player duels. Common variants exist (MTGO 1v1 was the most famous, now retired); modern duel play typically uses standard Commander rules with these adjustments:',
        '',
        '- Starting life: 30 (down from 40).',
        '- Mulligan: London Mulligan.',
        '- Commander damage: 21 from a single commander still wins.',
        '- Banlist: most communities use the standard Commander banlist. Some duel-focused groups maintain a separate, tighter banlist — check with your playgroup or local store.',
        '',
        'There is no single global "1v1 Commander" sanctioned format today; pre-2018 MTGO had its own list and MTGO Tabletop 1v1 has changed several times.'
      ].join('\n')
    },
    brawl: {
      title: 'Brawl & Historic Brawl',
      body: [
        'Brawl is Commander-flavoured singleton, restricted to Standard-legal cards (or Historic-legal for Historic Brawl). Built for MTG Arena.',
        '',
        '- Deck size: exactly 100 cards, including a legendary creature or planeswalker commander.',
        '- Singleton: only one of each non-basic card.',
        '- Starting life: 25 (multiplayer Brawl: 30).',
        '- Card pool: Standard for Brawl; Historic for Historic Brawl.',
        '- No commander damage rule.',
        '- Format-specific banlist; check the official Wizards Brawl banned/restricted page for current state.'
      ].join('\n')
    },
    two_headed_giant: {
      title: 'Two-Headed Giant (2HG)',
      body: [
        'Two-Headed Giant is a multiplayer team format. Two players on each team share a life total and share their turn.',
        '',
        '- Teams of two share 30 life (per team, not per player).',
        '- Each team takes a shared turn — both teammates untap, draw, play, etc. together.',
        '- The starting team skips its first draw step.',
        '- Combat: each player on the active team declares attackers separately; defending team\'s players each declare blockers.',
        '- Mulligan: London Mulligan; each player mulligans individually.',
        '- A team loses when its shared life total hits 0, or any other normal loss condition applies to either player.',
        '',
        'See the Magic Tournament Rules document on wpn.wizards.com for full 2HG specifics.'
      ].join('\n')
    },
    banned_restricted: {
      title: 'Banned & Restricted — Quick Reference',
      body: [
        'Format banlists change regularly. The canonical source is Wizards\' B&R announcement page at magic.wizards.com/en/banned-restricted-list — check it for the current state.',
        '',
        'Format banlist locations:',
        '- Standard:    magic.wizards.com/en/banned-restricted-list (Standard section)',
        '- Pioneer:     same page, Pioneer section',
        '- Modern:      same page, Modern section',
        '- Legacy:      same page, Legacy section',
        '- Vintage:     same page, Vintage section (includes the restricted list)',
        '- Commander:   mtgcommander.net/index.php/banned-list/',
        '- Pauper:      magic.wizards.com (Pauper section)',
        '',
        'Restricted (Vintage only): you may have at most one copy of restricted cards in your deck and sideboard combined.'
      ].join('\n')
    }
  };
  window.TQ.BUNDLED_FORMAT_RULES = BUNDLED_FORMAT_RULES;

  // Public fetch API: returns a Promise resolving to { title, body, source }
  window.TQ.fetchRules = function (which) {
    if (BUNDLED_FORMAT_RULES[which]) {
      var b = BUNDLED_FORMAT_RULES[which];
      return Promise.resolve({ title: b.title, body: b.body, source: 'bundled' });
    }
    if (which === 'comprehensive') {
      var cached = rulesCacheGet('comprehensive');
      if (cached) return Promise.resolve({ title: 'Magic: Comprehensive Rules', body: cached, source: 'cached' });
      return discoverCompRulesUrl().then(function (url) {
        if (!url) throw new Error('Could not find comp rules URL');
        return fetchText(url);
      }).then(function (text) {
        rulesCacheSet('comprehensive', text);
        return { title: 'Magic: Comprehensive Rules', body: text, source: 'live' };
      });
    }
    if (which === 'commander_full') {
      var cached2 = rulesCacheGet('commander_full');
      if (cached2) return Promise.resolve({ title: 'Commander — Full Rules', body: cached2, source: 'cached' });
      return fetchText('https://mtgcommander.net/index.php/rules/')
        .then(function (html) {
          // Crude HTML-to-text. Strip tags, normalise whitespace.
          var text = html
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<\/(p|h[1-6]|li|div|tr|br)>/gi, '\n')
            .replace(/<li[^>]*>/gi, '  - ')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#8217;/g, "'")
            .replace(/&#8220;|&#8221;/g, '"')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
          // Try to find just the rules body — strip nav/footer noise heuristically
          var startMarker = text.search(/MISSION STATEMENT|Mission Statement|PHILOSOPHY|Philosophy|Commander \(also/);
          if (startMarker > 0) text = text.slice(startMarker);
          rulesCacheSet('commander_full', text);
          return { title: 'Commander — Full Rules', body: text, source: 'live' };
        });
    }
    return Promise.reject(new Error('Unknown rules set: ' + which));
  };

  // Force a refresh (ignore cache)
  window.TQ.clearRulesCache = function () {
    try { localStorage.removeItem(RULES_CACHE_KEY); } catch (e) {}
  };

  // ---------- 13. Reference tab UI ----------
  // Mounted into the React-controlled <div ref> in app.js. We use vanilla DOM
  // so we don't have to wrestle with the compiled JSX in app.js.
  // Provides: search-only keyword lookup, rules reader with TOC + body search.

  // Static keyword list — concise summaries of MTG evergreen + common mechanics.
  // Each: { k: keyword, t: short text }
  var REFERENCE_KEYWORDS = [
    { k: 'Deathtouch',     t: 'Any amount of damage this deals to a creature is enough to destroy it.' },
    { k: 'Defender',       t: 'This creature can\'t attack.' },
    { k: 'Double Strike',  t: 'This creature deals both first-strike and regular combat damage.' },
    { k: 'Enchant',        t: 'Target a permanent of the specified type when cast; this Aura attaches to it.' },
    { k: 'Equip',          t: 'Pay the equip cost as a sorcery to attach this Equipment to a creature you control.' },
    { k: 'First Strike',   t: 'This creature deals its combat damage before creatures without first strike.' },
    { k: 'Flash',          t: 'You may cast this spell any time you could cast an instant.' },
    { k: 'Flying',         t: 'Can only be blocked by creatures with flying or reach.' },
    { k: 'Haste',          t: 'Can attack and {T} the turn it comes under your control.' },
    { k: 'Hexproof',       t: 'Can\'t be the target of spells or abilities opponents control.' },
    { k: 'Indestructible', t: 'Damage and effects that say "destroy" don\'t destroy it. Lethal damage still removes counters via state-based actions only via -1/-1.' },
    { k: 'Lifelink',       t: 'Damage dealt by this also causes you to gain that much life.' },
    { k: 'Menace',         t: 'Can\'t be blocked except by two or more creatures.' },
    { k: 'Protection from X', t: 'Can\'t be Damaged, Equipped/Enchanted, Targeted, or Blocked by X (DEBT).' },
    { k: 'Reach',          t: 'Can block creatures with flying.' },
    { k: 'Trample',        t: 'Excess combat damage may be assigned to the defending player or planeswalker.' },
    { k: 'Vigilance',      t: 'Attacking doesn\'t cause this to tap.' },
    { k: 'Ward',           t: 'Whenever this becomes target of a spell or ability opponents control, counter it unless they pay ward cost.' },
    { k: 'Cycling',        t: 'Discard this card to draw a card by paying the cycling cost.' },
    { k: 'Convoke',        t: 'Each creature you tap while casting this pays for {1} or one mana of that creature\'s colour.' },
    { k: 'Cascade',        t: 'When cast, exile cards until you exile a nonland with lesser mana value; you may cast it without paying.' },
    { k: 'Affinity for X', t: 'This spell costs {1} less to cast for each X you control.' },
    { k: 'Storm',          t: 'When cast, copy it for each other spell cast before it this turn. Choose new targets per copy.' },
    { k: 'Suspend',        t: 'Exile with N time counters; remove one each upkeep. When the last is removed, cast without paying.' },
    { k: 'Proliferate',    t: 'Choose any number of permanents and/or players with counters. Add one more of each kind already there.' },
    { k: 'Scry N',         t: 'Look at the top N cards of your library, put any on the bottom and the rest back on top in any order.' },
    { k: 'Surveil N',      t: 'Look at the top N cards; put any number into your graveyard and the rest on top in any order.' },
    { k: 'Mill N',         t: 'Put the top N cards of your library into your graveyard.' },
    { k: 'Explore',        t: 'Reveal the top card; if land, put in hand. Otherwise put a +1/+1 counter on the creature and optionally put the card in your graveyard.' },
    { k: 'Adapt N',        t: 'If this creature has no +1/+1 counters, put N +1/+1 counters on it.' },
    { k: 'Monstrosity N',  t: 'If this creature isn\'t monstrous, put N +1/+1 counters on it and it becomes monstrous.' },
    { k: 'Embalm',         t: 'Exile this card from your graveyard, paying the embalm cost, to create a token copy that\'s a white Zombie with no mana cost.' },
    { k: 'Eternalize',     t: 'Exile this card from your graveyard, paying the eternalize cost, to create a 4/4 black Zombie token copy with no mana cost.' },
    { k: 'Madness',        t: 'If you discard this, you may cast it for its madness cost.' },
    { k: 'Flashback',      t: 'You may cast this from your graveyard for its flashback cost; then exile it.' },
    { k: 'Delve',          t: 'You may exile any number of cards from your graveyard as you cast this. Each card exiled this way pays for {1}.' },
    { k: 'Investigate',    t: 'Create a colorless Clue artifact token with "{2}, Sacrifice this: Draw a card."' },
    { k: 'Food',           t: 'Create a colorless Food artifact token with "{2}, {T}, Sacrifice this: You gain 3 life."' },
    { k: 'Treasure',       t: 'Create a colorless Treasure artifact token with "{T}, Sacrifice this: Add one mana of any colour."' },
    { k: 'Saga',           t: 'On the appropriate phase each turn, advance the saga\'s chapter; effects trigger as the chapter is reached.' },
    { k: 'Modal Double-Faced Card (MDFC)', t: 'A card with two faces, either of which may be cast. Doesn\'t flip during play; you choose at cast time.' }
  ];

  function makeEl(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === 'style' && typeof attrs[k] === 'object') Object.assign(el.style, attrs[k]);
        else if (k === 'onClick') el.addEventListener('click', attrs[k]);
        else if (k === 'html') el.innerHTML = attrs[k];
        else if (k === 'text') el.textContent = attrs[k];
        else if (k === 'className') el.className = attrs[k];
        else el.setAttribute(k, attrs[k]);
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else el.appendChild(c);
      });
    }
    return el;
  }

  function escapeHtml2(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  // The Reference tab is mounted on each tab activation. To avoid wiping
  // state on re-mounts (e.g. tab switches), we cache the panel in a module
  // var and re-attach.
  var referencePanel = null;

  window.TQ.mountReference = function (host) {
    if (!host) return;
    if (referencePanel && referencePanel.parentNode === host) return;
    if (referencePanel) {
      host.appendChild(referencePanel);
      return;
    }
    referencePanel = buildReferencePanel();
    host.innerHTML = '';
    host.appendChild(referencePanel);
  };

  function buildReferencePanel() {
    var root = makeEl('div', { style: { padding: '20px 16px 24px', color: '#e8dcc4', fontFamily: "'Crimson Pro', serif", maxWidth: '720px', margin: '0 auto' } });

    // Header
    root.appendChild(makeEl('div', { style: { textAlign: 'center', marginBottom: '20px' } }, [
      makeEl('h1', {
        style: { fontFamily: "'Cinzel', serif", color: '#c9a961', letterSpacing: '0.3em', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' },
        text: 'Reference'
      }),
      makeEl('div', { style: { width: '60px', height: '1px', background: 'rgba(201,169,97,0.4)', margin: '0 auto' } })
    ]));

    // --- Keyword search section ---
    var kwSection = makeEl('section', { style: { marginBottom: '32px' } });
    kwSection.appendChild(makeEl('h2', {
      style: { fontFamily: "'Cinzel', serif", color: '#c9a961', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '10px' },
      text: 'Keywords'
    }));
    var kwInput = makeEl('input', {
      type: 'search',
      placeholder: 'Search keywords (e.g. trample, flash, ward)...',
      style: {
        width: '100%', padding: '10px 14px', fontSize: '14px',
        background: 'rgba(20,14,8,0.8)', border: '1px solid rgba(201,169,97,0.3)',
        borderRadius: '4px', color: '#e8dcc4', fontFamily: "'Crimson Pro', serif",
        outline: 'none', boxSizing: 'border-box'
      }
    });
    var kwResults = makeEl('div', { style: { marginTop: '10px' } });
    var renderKw = function () {
      var q = kwInput.value.trim().toLowerCase();
      kwResults.innerHTML = '';
      if (!q) {
        kwResults.appendChild(makeEl('p', {
          style: { color: '#6a5a42', fontStyle: 'italic', fontSize: '12px', textAlign: 'center', padding: '12px 0' },
          text: 'Type to search ' + REFERENCE_KEYWORDS.length + ' keywords.'
        }));
        return;
      }
      var hits = REFERENCE_KEYWORDS.filter(function (kw) {
        return kw.k.toLowerCase().indexOf(q) !== -1 || kw.t.toLowerCase().indexOf(q) !== -1;
      });
      if (hits.length === 0) {
        kwResults.appendChild(makeEl('p', {
          style: { color: '#9a8765', fontSize: '12px', textAlign: 'center', padding: '12px 0' },
          text: 'No matches.'
        }));
        return;
      }
      hits.forEach(function (kw) {
        kwResults.appendChild(makeEl('div', {
          style: { padding: '10px 14px', marginBottom: '6px', background: 'rgba(20,14,8,0.6)', border: '1px solid rgba(154,135,101,0.18)', borderRadius: '3px' }
        }, [
          makeEl('div', { style: { fontFamily: "'Cinzel', serif", color: '#d4b87a', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }, text: kw.k }),
          makeEl('div', { style: { color: '#b09870', fontSize: '13px', lineHeight: 1.4 }, text: kw.t })
        ]));
      });
    };
    kwInput.addEventListener('input', renderKw);
    kwSection.appendChild(kwInput);
    kwSection.appendChild(kwResults);
    renderKw();
    root.appendChild(kwSection);

    // --- Rules reader section ---
    var rulesSection = makeEl('section');
    rulesSection.appendChild(makeEl('h2', {
      style: { fontFamily: "'Cinzel', serif", color: '#c9a961', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '10px' },
      text: 'Rules'
    }));

    var RULES_INDEX = [
      { id: 'comprehensive',       title: 'Comprehensive Rules',         subtitle: 'Wizards official — live fetch + cache' },
      { id: 'commander_intro',     title: 'Commander / EDH',             subtitle: 'Quick reference, multiplayer 100-card singleton' },
      { id: 'commander_full',      title: 'Commander — Full Rules',      subtitle: 'mtgcommander.net — live fetch + cache' },
      { id: 'onevsone_commander',  title: '1v1 Commander',               subtitle: 'Duel-format adjustments' },
      { id: 'brawl',               title: 'Brawl & Historic Brawl',      subtitle: 'Standard / Historic singleton' },
      { id: 'two_headed_giant',    title: 'Two-Headed Giant (2HG)',      subtitle: 'Team format, shared life' },
      { id: 'banned_restricted',   title: 'Banned & Restricted',         subtitle: 'Quick reference + canonical links' }
    ];

    var reader = makeEl('div', { style: { display: 'none', marginTop: '12px' } });
    var rulesList = makeEl('div');

    RULES_INDEX.forEach(function (item) {
      var card = makeEl('button', {
        style: {
          display: 'block', width: '100%', textAlign: 'left',
          padding: '12px 14px', marginBottom: '8px',
          background: 'rgba(20,14,8,0.6)', border: '1px solid rgba(154,135,101,0.25)',
          borderRadius: '3px', color: '#e8dcc4', fontFamily: "'Crimson Pro', serif",
          cursor: 'pointer'
        }
      }, [
        makeEl('div', { style: { fontFamily: "'Cinzel', serif", color: '#d4b87a', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }, text: item.title }),
        makeEl('div', { style: { color: '#8a7555', fontSize: '11px', marginTop: '3px', fontStyle: 'italic' }, text: item.subtitle })
      ]);
      card.addEventListener('click', function () { openRulesReader(item.id, item.title); });
      rulesList.appendChild(card);
    });
    rulesSection.appendChild(rulesList);
    rulesSection.appendChild(reader);

    function openRulesReader(which, title) {
      rulesList.style.display = 'none';
      reader.innerHTML = '';
      reader.style.display = 'block';

      // Header bar with back + search
      var bar = makeEl('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' } });
      var back = makeEl('button', {
        style: {
          padding: '6px 12px', background: 'rgba(20,14,8,0.8)', color: '#c9a961',
          border: '1px solid rgba(201,169,97,0.35)', borderRadius: '3px',
          fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.15em',
          cursor: 'pointer'
        },
        text: '\u2190 BACK'
      });
      back.addEventListener('click', function () {
        reader.style.display = 'none';
        rulesList.style.display = 'block';
      });
      var searchInput = makeEl('input', {
        type: 'search',
        placeholder: 'Search within text...',
        style: {
          flex: '1', padding: '6px 10px', fontSize: '12px',
          background: 'rgba(20,14,8,0.8)', border: '1px solid rgba(201,169,97,0.3)',
          borderRadius: '3px', color: '#e8dcc4', fontFamily: "'Crimson Pro', serif",
          outline: 'none'
        }
      });
      bar.appendChild(back);
      bar.appendChild(searchInput);
      reader.appendChild(bar);

      var titleEl = makeEl('h3', {
        style: { fontFamily: "'Cinzel', serif", color: '#d4b87a', fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' },
        text: title
      });
      reader.appendChild(titleEl);

      var status = makeEl('div', {
        style: { color: '#9a8765', fontSize: '12px', fontStyle: 'italic', padding: '12px 0' },
        text: 'Loading...'
      });
      reader.appendChild(status);

      var body = makeEl('div', {
        style: {
          background: 'rgba(20,14,8,0.4)', border: '1px solid rgba(154,135,101,0.18)',
          borderRadius: '3px', padding: '14px',
          color: '#cab896', fontSize: '13px', lineHeight: 1.55,
          whiteSpace: 'pre-wrap', fontFamily: "'Crimson Pro', serif",
          maxHeight: '60vh', overflowY: 'auto'
        }
      });
      reader.appendChild(body);

      var fullText = '';
      var renderBody = function () {
        var q = searchInput.value.trim();
        if (!q) {
          body.textContent = fullText;
          return;
        }
        var lines = fullText.split('\n');
        var matched = [];
        var lower = q.toLowerCase();
        lines.forEach(function (ln, idx) {
          if (ln.toLowerCase().indexOf(lower) !== -1) {
            matched.push(ln);
          }
        });
        if (matched.length === 0) {
          body.textContent = 'No matches in this document.';
        } else {
          body.innerHTML = matched.map(function (ln) {
            // highlight match
            var safeLn = escapeHtml2(ln);
            var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            return safeLn.replace(re, '<mark style="background:rgba(201,169,97,0.35);color:#fffbe6;padding:1px 2px;border-radius:2px">$1</mark>');
          }).join('<br>');
          body.style.whiteSpace = 'normal';
        }
      };
      searchInput.addEventListener('input', renderBody);

      window.TQ.fetchRules(which).then(function (data) {
        status.textContent = data.source === 'cached'
          ? 'Loaded from cache.'
          : data.source === 'live'
            ? 'Loaded live. Cached for 30 days.'
            : 'Bundled summary.';
        fullText = data.body || '';
        renderBody();
      }).catch(function (err) {
        status.textContent = 'Could not load. ' + (err.message || '');
        status.style.color = '#d48a86';
      });
    }

    root.appendChild(rulesSection);

    // Attribution footer
    root.appendChild(makeEl('div', {
      style: { marginTop: '32px', padding: '12px 0', borderTop: '1px solid rgba(154,135,101,0.18)', textAlign: 'center', color: '#6a5a42', fontSize: '10px', fontStyle: 'italic', lineHeight: 1.5 },
      text: 'Mana symbols, card art and rules text are © Wizards of the Coast. Symbols and card data via Scryfall. Comprehensive Rules: magic.wizards.com/en/rules. Commander rules: mtgcommander.net.'
    }));

    return root;
  }

  // ---------- 8. Audio helpers — fanfares, win stingers ----------
  // Lightweight Web Audio synth — no assets, no library. Reused by hatch
  // ceremony and any other moment that wants a small triumphant flourish.
  var sharedAudioCtx = null;
  function getAudioCtx() {
    if (sharedAudioCtx) return sharedAudioCtx;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      sharedAudioCtx = new AC();
      return sharedAudioCtx;
    } catch (e) { return null; }
  }
  function playNote(ctx, freq, startOffset, duration, type, vol) {
    type = type || 'triangle';
    vol = vol || 0.12;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime + startOffset);
    g.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + startOffset + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startOffset + duration);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + startOffset);
    o.stop(ctx.currentTime + startOffset + duration + 0.05);
  }
  // Hatch fanfare — ascending power-chord flourish, ~1.2s
  window.TQ.playFanfare = function () {
    var ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(function () {});
    // C major triumphant climb: C E G C, then a high sparkle
    var seq = [
      [261.63, 0.00, 0.18, 'triangle', 0.14], // C4
      [329.63, 0.10, 0.18, 'triangle', 0.14], // E4
      [392.00, 0.20, 0.18, 'triangle', 0.14], // G4
      [523.25, 0.30, 0.40, 'triangle', 0.16], // C5 hold
      [659.25, 0.55, 0.30, 'triangle', 0.12], // E5
      [783.99, 0.70, 0.45, 'sine',     0.10], // G5 sparkle
      [1046.5, 0.85, 0.55, 'sine',     0.08]  // C6 shimmer
    ];
    seq.forEach(function (n) { playNote(ctx, n[0], n[1], n[2], n[3], n[4]); });
    // Bass support
    playNote(ctx, 130.81, 0.30, 0.80, 'sawtooth', 0.06); // C3
  };

  // ---------- 9. Background preload — warm Scryfall + browser cache ----------
  // Runs once at boot, low priority. By the time the user opens the memory
  // game in the Sanctum, all 12 token images are already in the HTTP cache
  // and the localStorage cache has fresh Scryfall URLs, so flips reveal
  // instantly instead of waiting for the network.
  function preload() {
    var allIds = Object.keys(MEMORY_ID_MAP);
    var i = 0;
    function next() {
      if (i >= allIds.length) return;
      var memId = allIds[i++];
      resolveMemoryToken(memId).then(function (data) {
        if (data && data.art) {
          var img = new Image();
          img.src = data.art;
        }
      }).catch(function () {}).then(function () {
        setTimeout(next, 150);
      });
    }
    next();
    Object.keys(FALLBACKS.counters).forEach(function (id) {
      resolveCounter(id).then(function (data) {
        if (data && data.art) { var img = new Image(); img.src = data.art; }
      }).catch(function () {});
    });
  }
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(preload, { timeout: 3000 });
  } else {
    setTimeout(preload, 2000);
  }
})();
