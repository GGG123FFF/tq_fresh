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

  // Counter pip auto-decoration removed: the app already renders its own
  // counter pip (single/double letter). The popup that opens on tap covers
  // the "see the card" need without duplicating visual elements.
  function decorateCounterSpan() { /* no-op, kept for MutationObserver call site */ }

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
  // ~120 entries: every evergreen ability, every common deciduous mechanic,
  // and the major named mechanics from the last few years of releases.
  // Each: { k: keyword, t: short text }
  var REFERENCE_KEYWORDS = [
    // ============ Evergreen ============
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
    { k: 'Shroud',         t: 'This permanent can\'t be the target of any spells or abilities. (Older keyword; replaced by hexproof in most cases.)' },
    { k: 'Reach (Spider)', t: 'Same rule as reach: can block flying creatures.' },
    { k: 'Banding',        t: 'Old keyword; lets attacking creatures form bands and lets the defender choose damage assignment.' },
    { k: 'Intimidate',     t: 'Can\'t be blocked except by artifact creatures and/or creatures that share a colour with this.' },
    { k: 'Fear',           t: 'Can\'t be blocked except by artifact creatures and/or black creatures.' },
    { k: 'Landwalk',       t: 'Plainswalk/Islandwalk/Swampwalk/Mountainwalk/Forestwalk: can\'t be blocked while defender controls that land type.' },

    // ============ Spell/Cost mechanics ============
    { k: 'Cycling',        t: 'Discard this card to draw a card by paying the cycling cost.' },
    { k: 'Typecycling',    t: 'Discard this card to search your library for a card of the specified type, by paying the typecycling cost.' },
    { k: 'Convoke',        t: 'Each creature you tap while casting this pays for {1} or one mana of that creature\'s colour.' },
    { k: 'Improvise',      t: 'Each artifact you tap while casting this pays for {1}.' },
    { k: 'Delve',          t: 'You may exile any number of cards from your graveyard as you cast this. Each card exiled this way pays for {1}.' },
    { k: 'Emerge',         t: 'You may cast this by sacrificing a creature and paying the emerge cost minus that creature\'s mana value.' },
    { k: 'Affinity for X', t: 'This spell costs {1} less to cast for each X you control.' },
    { k: 'Cascade',        t: 'When cast, exile cards until you exile a nonland with lesser mana value; you may cast it without paying.' },
    { k: 'Storm',          t: 'When cast, copy it for each other spell cast before it this turn. Choose new targets per copy.' },
    { k: 'Suspend',        t: 'Exile with N time counters; remove one each upkeep. When the last is removed, cast without paying.' },
    { k: 'Buyback',        t: 'You may pay the buyback cost when casting; if you do, put this card into your hand instead of the graveyard as it resolves.' },
    { k: 'Flashback',      t: 'You may cast this from your graveyard for its flashback cost; then exile it.' },
    { k: 'Madness',        t: 'If you discard this, you may cast it for its madness cost.' },
    { k: 'Dredge',         t: 'If you would draw a card and this is in your graveyard, you may instead mill N cards and return this to your hand.' },
    { k: 'Retrace',        t: 'You may cast this from your graveyard by discarding a land card in addition to paying its costs.' },
    { k: 'Splice onto X',  t: 'As you cast an X spell, you may reveal this from your hand and pay its splice cost to add its effect.' },
    { k: 'Kicker',         t: 'You may pay an additional cost as you cast this. If you do, it gains additional effects.' },
    { k: 'Multikicker',    t: 'Kicker that can be paid any number of times.' },
    { k: 'Overload',       t: 'You may cast this for its overload cost; if you do, replace "target" with "each".' },
    { k: 'Entwine',        t: 'Choose all modes by paying the entwine cost.' },
    { k: 'Escape',         t: 'You may cast this from your graveyard by paying its escape cost and exiling other cards from your graveyard.' },
    { k: 'Spectacle',      t: 'You may cast this for its spectacle cost rather than its mana cost if an opponent lost life this turn.' },
    { k: 'Foretell',       t: 'During your turn, exile this from your hand face-down for {2}. On a later turn you may cast it for its foretell cost.' },
    { k: 'Disturb',        t: 'You may cast this from your graveyard transformed by paying its disturb cost.' },
    { k: 'Cleave',         t: 'You may cast this for its cleave cost. If you do, remove the text in brackets.' },
    { k: 'Channel',        t: 'Discard this card; pay the channel cost. This card grants an effect from your hand.' },
    { k: 'Bargain',        t: 'You may sacrifice an artifact, creature, or land as you cast this for additional effect.' },
    { k: 'Casualty N',     t: 'As you cast this, you may sacrifice a creature with power N or greater. If you do, copy this spell.' },
    { k: 'Disguise',       t: 'You may cast this face-down as a 2/2 creature for {3}. Turn it face-up any time for its disguise cost; it has ward {2}.' },
    { k: 'Plot',           t: 'During your turn, exile this from your hand and pay the plot cost. On a later turn, you may cast it from exile without paying.' },
    { k: 'Impending N',    t: 'You may cast this for its impending cost. If you do, it enters with N time counters. It\'s not a creature until the last is removed.' },
    { k: 'Saddle N',       t: 'Tap any number of other creatures you control with total power N or more: this Mount becomes saddled until end of turn.' },
    { k: 'Spree',          t: 'As you cast this, choose one or more additional costs; the spell gains the corresponding effects.' },
    { k: 'Eerie',          t: 'Whenever an enchantment enters under your control or you fully unlock a Room, the eerie ability triggers.' },
    { k: 'Outlaw',          t: 'Outlaw is a card-type shorthand (Assassin, Mercenary, Pirate, Rogue, Warlock). Many cards reference outlaws as a group.' },
    { k: 'Offspring',      t: 'You may pay the offspring cost as you cast this. If you do, when it enters, create a 1/1 token copy.' },

    // ============ Triggered/Activated patterns ============
    { k: 'Proliferate',    t: 'Choose any number of permanents and/or players with counters. Add one more of each kind already there.' },
    { k: 'Populate',       t: 'Create a token that\'s a copy of a creature token you control.' },
    { k: 'Scry N',         t: 'Look at the top N cards of your library, put any on the bottom and the rest back on top in any order.' },
    { k: 'Surveil N',      t: 'Look at the top N cards; put any number into your graveyard and the rest on top in any order.' },
    { k: 'Mill N',         t: 'Put the top N cards of your library into your graveyard.' },
    { k: 'Explore',        t: 'Reveal the top card; if land, put in hand. Otherwise put a +1/+1 counter on the creature and optionally put the card in your graveyard.' },
    { k: 'Adapt N',        t: 'If this creature has no +1/+1 counters, put N +1/+1 counters on it.' },
    { k: 'Monstrosity N',  t: 'If this creature isn\'t monstrous, put N +1/+1 counters on it and it becomes monstrous.' },
    { k: 'Renown N',       t: 'When this deals combat damage to a player, if it isn\'t renowned, put N +1/+1 counters and it becomes renowned.' },
    { k: 'Embalm',         t: 'Exile this card from your graveyard, paying the embalm cost, to create a token copy that\'s a white Zombie with no mana cost.' },
    { k: 'Eternalize',     t: 'Exile this card from your graveyard, paying the eternalize cost, to create a 4/4 black Zombie token copy with no mana cost.' },
    { k: 'Investigate',    t: 'Create a colorless Clue artifact token with "{2}, Sacrifice this: Draw a card."' },
    { k: 'Food',           t: 'Create a colorless Food artifact token with "{2}, {T}, Sacrifice this: You gain 3 life."' },
    { k: 'Treasure',       t: 'Create a colorless Treasure artifact token with "{T}, Sacrifice this: Add one mana of any colour."' },
    { k: 'Blood',          t: 'Create a colorless Blood artifact token with "{1}, {T}, Discard a card, Sacrifice this: Draw a card."' },
    { k: 'Map',            t: 'Create a colorless Map artifact token with "{1}, {T}, Sacrifice this: Target creature explores."' },
    { k: 'Powerstone',     t: 'Create a colorless Powerstone artifact token with "{T}: Add {C}. This mana can\'t be spent to cast a nonartifact spell."' },
    { k: 'Manifest',       t: 'Put the top card of your library onto the battlefield face-down as a 2/2 creature. Turn it face-up at any time for its mana cost if it\'s a creature card.' },
    { k: 'Morph',          t: 'You may cast this face-down as a 2/2 creature for {3}. Turn it face-up at any time for its morph cost.' },
    { k: 'Megamorph',      t: 'Like morph, but turning it face-up also puts a +1/+1 counter on it.' },
    { k: 'Bestow',         t: 'You may cast this for its bestow cost as an Aura that enchants a creature. If the enchanted creature dies, this becomes a creature again.' },
    { k: 'Soulbond',       t: 'You may pair this with another unpaired creature when either enters. They become soulbonded for as long as you control both.' },
    { k: 'Soulshift',      t: 'When this dies, you may return a Spirit card with lesser mana value from your graveyard to your hand.' },
    { k: 'Persist',        t: 'When this dies, if it had no -1/-1 counters on it, return it to the battlefield with a -1/-1 counter.' },
    { k: 'Undying',        t: 'When this dies, if it had no +1/+1 counters, return it with a +1/+1 counter.' },
    { k: 'Modular',        t: 'This creature enters with N +1/+1 counters; when it dies, you may move them to another artifact creature.' },
    { k: 'Living Weapon',  t: 'When this Equipment enters, create a 0/0 black Phyrexian Germ token and attach this to it.' },
    { k: 'Reconfigure',    t: 'You may pay the reconfigure cost to attach/unattach this Equipment-creature from a creature you control.' },
    { k: 'Mutate',         t: 'You may cast this for its mutate cost. If you do, combine it with a non-Human creature you control, mixing abilities.' },
    { k: 'Companion',      t: 'If your starting deck meets the companion\'s condition, you may start with it outside the game and cast it once per game.' },
    { k: 'Crew N',         t: 'Tap any number of creatures you control with total power N+ to turn this Vehicle into an artifact creature until end of turn.' },
    { k: 'Devour N',       t: 'As this enters, sacrifice any number of creatures; this enters with N +1/+1 counters per creature sacrificed.' },
    { k: 'Exploit',        t: 'When this enters, you may sacrifice a creature for additional effect.' },

    // ============ Card-types / structural ============
    { k: 'Saga',           t: 'On the appropriate phase each turn, advance the saga\'s chapter; effects trigger as the chapter is reached.' },
    { k: 'Class',          t: 'A Class enchantment with multiple levels. Pay level-up cost as a sorcery to advance.' },
    { k: 'Battle',         t: 'A new card type. Battles enter with defense counters and can be attacked. Reduce to 0 to flip and trigger an effect.' },
    { k: 'Room',           t: 'A split enchantment with two unlocked halves. Pay either side\'s cost to unlock that half; unlock both for full effect.' },
    { k: 'Modal Double-Faced Card (MDFC)', t: 'A card with two faces, either of which may be cast. Doesn\'t flip during play; you choose at cast time.' },
    { k: 'Transform',      t: 'Some double-faced cards transform between front and back faces in play, triggered by abilities or conditions.' },
    { k: 'Adventure',      t: 'You may cast the adventure side from your hand for its alternate cost. If exiled this way, you may cast the creature side later.' },
    { k: 'Backgrounds',    t: 'A Background is an enchantment subtype. Some commanders allow you to have one Background in your command zone in addition.' },
    { k: 'Partner',        t: 'You may have two commanders, each with the partner keyword, in your command zone.' },
    { k: 'Partner with X', t: 'If both partners are in your starting deck, you may have both as commanders.' },
    { k: 'Friends Forever',t: 'Like partner: you may pair this commander with another that also has Friends Forever.' },
    { k: 'Doctor\'s Companion', t: 'Doctor Who-set partner mechanic: a Doctor commander can be paired with a Companion creature.' },

    // ============ Recent or set-specific ============
    { k: 'Toxic N',        t: 'Whenever this deals combat damage to a player, they get N poison counters.' },
    { k: 'Corrupted',      t: 'A card has corrupted abilities active while opponents have 3 or more poison counters.' },
    { k: 'Incubate N',     t: 'Create an Incubator token with N +1/+1 counters that transforms into a 0/0 Phyrexian artifact creature for {2}.' },
    { k: 'For Mirrodin!',  t: 'When this Equipment enters, create a 2/2 red Rebel creature token and attach this to it.' },
    { k: 'Discover N',     t: 'Exile cards until you exile a nonland with mana value N or less. Cast it without paying or put it into your hand.' },
    { k: 'Boast',          t: 'Activate this ability only if this creature attacked this turn, and only once per turn.' },
    { k: 'Magecraft',      t: 'Trigger whenever you cast or copy an instant or sorcery spell.' },
    { k: 'Coven',          t: 'You have coven as long as you control three or more creatures with different powers.' },
    { k: 'Domain',         t: 'Effect scales with the number of basic land types among lands you control (max 5).' },
    { k: 'Strive',         t: 'You may copy this spell for each additional target by paying the strive cost per target.' },
    { k: 'Constellation',  t: 'Trigger whenever an enchantment enters under your control.' },
    { k: 'Devotion to X',  t: 'Counts coloured mana symbols among permanents you control that match X.' },
    { k: 'Heroic',         t: 'Trigger whenever you cast a spell that targets this creature.' },
    { k: 'Prowess',        t: 'Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn.' },
    { k: 'Threshold',      t: 'Effect active as long as seven or more cards are in your graveyard.' },
    { k: 'Hellbent',       t: 'Effect active as long as you have no cards in hand.' },
    { k: 'Metalcraft',     t: 'Effect active as long as you control three or more artifacts.' },
    { k: 'Delirium',       t: 'Effect active as long as four or more card types are in your graveyard.' },
    { k: 'Revolt',         t: 'Trigger if a permanent you controlled left the battlefield this turn.' },
    { k: 'Raid',           t: 'Trigger or condition active if you attacked with a creature this turn.' },
    { k: 'Landfall',       t: 'Trigger whenever a land enters under your control.' },
    { k: 'Constellation',  t: 'See above — trigger on enchantment enters.' },
    { k: 'Ferocious',      t: 'Effect active as long as you control a creature with power 4 or greater.' },
    { k: 'Formidable',     t: 'Effect active as long as creatures you control have total power 8 or greater.' },
    { k: 'Inspired',       t: 'Trigger whenever this creature becomes untapped.' },
    { k: 'Energy',         t: 'Energy counters are a player resource. Effects say "Get {E}" and many costs spend energy.' },
    { k: 'Initiative',     t: 'The initiative is taken from another player by dealing combat damage; the initiative-holder gains "Undercity" venture-style triggers.' },
    { k: 'Venture into the Dungeon', t: 'Enter a chosen dungeon (or advance to the next room). Reaching the end provides a final effect.' },
    { k: 'Munition',       t: 'Equipment-type permanent that may be detonated/consumed for an effect.' },
    { k: 'Mentor',         t: 'When this attacks, put a +1/+1 counter on target attacking creature with lesser power.' },
    { k: 'Afflict N',      t: 'Whenever this becomes blocked, defending player loses N life.' },
    { k: 'Amass N',        t: 'Put N +1/+1 counters on an Army you control. If you don\'t have one, create a 0/0 black Zombie Army token first.' },
    { k: 'Compleated',     t: 'You may pay {P} (Phyrexian mana) by paying 2 life rather than the coloured mana cost.' },
    { k: 'Phyrexian Mana', t: '{W/P}, {U/P}, etc. — pay either the colour or 2 life.' },
    { k: 'Hybrid Mana',    t: '{W/U}, etc. — pay either of the two colours.' },
    { k: 'Snow',           t: 'A supertype on lands and some other cards. Snow mana is mana produced by snow permanents.' }
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
    // Feature 14: warm comp rules in background so first tap is instant
    if (window.TQ && typeof window.TQ.fetchRules === 'function') {
      setTimeout(function () {
        window.TQ.fetchRules('comprehensive').catch(function () {});
      }, 5000);
    }
  }
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(preload, { timeout: 3000 });
  } else {
    setTimeout(preload, 2000);
  }

  // ============================================================
  // FEATURES: oracle text, color identity validator, memory tiers,
  // orb hint, pet xp ring, vault open-in links, onboarding,
  // deck export, vault sort.
  // ============================================================

  // ---- Feature 7: Oracle text mana symbols ----
  // Parses {2}{U}{U} style symbols and inserts <img> elements inline.
  window.TQ.renderOracleText = function (el, text) {
    if (!el) return;
    el.innerHTML = '';
    if (!text) { el.textContent = '(No rules text)'; return; }
    // Match any {…} token, plus any text in between
    var re = /\{([^}]+)\}/g;
    var lastIdx = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIdx) {
        el.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
      }
      var sym = m[1].toUpperCase();
      var img = document.createElement('img');
      img.src = 'https://svgs.scryfall.io/card-symbols/' + sym + '.svg';
      img.alt = '{' + sym + '}';
      img.style.cssText = 'width:14px;height:14px;display:inline-block;vertical-align:-2px;margin:0 1px;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,0.4)';
      // Fallback to bundled if local exists
      if (BUNDLED_SYMBOLS[sym]) {
        img.onerror = function (fb) { return function (e) {
          if (e.currentTarget.dataset.tqFb === '1') return;
          e.currentTarget.dataset.tqFb = '1';
          e.currentTarget.src = LOCAL_SYMBOL_BASE + fb + '.svg';
        }; }(sym);
      }
      el.appendChild(img);
      lastIdx = re.lastIndex;
    }
    if (lastIdx < text.length) {
      el.appendChild(document.createTextNode(text.slice(lastIdx)));
    }
  };

  // ---- Feature 8: Deck colour identity validator ----
  // Given a commander name and a list of card names in the 99,
  // checks each card's colour identity against the commander.
  // Returns Promise<{ commanderIdentity: ['W','U'], violators: [{name, identity}], ok }>
  window.TQ.validateDeckIdentity = function (commanderName, cardNames) {
    if (!commanderName || !Array.isArray(cardNames)) {
      return Promise.reject(new Error('validateDeckIdentity: bad args'));
    }
    function fetchCardIdentity(name) {
      var ck = 'ident:' + name.toLowerCase();
      var cached = cacheGet(ck);
      if (cached) return Promise.resolve(cached);
      return fetchJSON(SCRYFALL_API + '/cards/named?exact=' + encodeURIComponent(name))
        .then(function (card) {
          var ci = card.color_identity || [];
          cacheSet(ck, ci);
          return ci;
        })
        .catch(function () { return null; });
    }
    return fetchCardIdentity(commanderName).then(function (cmdIdent) {
      if (!cmdIdent) throw new Error('Commander not found on Scryfall');
      var cmdSet = {};
      cmdIdent.forEach(function (c) { cmdSet[c] = 1; });
      // Walk cards one at a time, gently throttled
      var violators = [];
      var unknown = [];
      var idx = 0;
      function next() {
        if (idx >= cardNames.length) {
          return { commanderIdentity: cmdIdent, violators: violators, unknown: unknown, ok: violators.length === 0 };
        }
        var n = cardNames[idx++];
        return fetchCardIdentity(n).then(function (ci) {
          if (ci === null) { unknown.push(n); }
          else {
            var bad = ci.filter(function (c) { return !cmdSet[c]; });
            if (bad.length) violators.push({ name: n, identity: ci, illegal: bad });
          }
          return new Promise(function (r) { setTimeout(r, 80); }).then(next);
        });
      }
      return next();
    });
  };

  // ---- Feature 9: Memory game difficulty tiers ----
  // Exposes preferred pair count; app.js can read it if it wants. Default is 6 pairs.
  window.TQ.memoryConfig = {
    tier: localStorage.getItem('tq_memory_tier') || 'normal',
    pairsForTier: function (t) {
      return ({ easy: 4, normal: 6, hard: 8, expert: 10 })[t] || 6;
    },
    setTier: function (t) {
      this.tier = t;
      try { localStorage.setItem('tq_memory_tier', t); } catch (e) {}
    }
  };

  // ---- Feature 10: Sanctum orb sequence hint ----
  // After ~10 seconds of inactivity on the orbs, pulse them in W→U→B→R→G order.
  // We hook the existing decorate observer to find orbs (40px round buttons with
  // single-letter content) inside the Sanctum.
  var orbHintState = { lastTap: Date.now(), timer: null, active: false };
  function startOrbHint() {
    if (orbHintState.active) return;
    var letters = ['W', 'U', 'B', 'R', 'G'];
    var btns = letters.map(function (L) {
      var found = null;
      document.querySelectorAll('button[aria-label]').forEach(function (b) {
        if (found) return;
        var al = b.getAttribute('aria-label') || '';
        if (al.indexOf('mana orb') !== -1 && al.charAt(0).toUpperCase() === ({ W:'W',U:'B',B:'B',R:'R',G:'G' }[L] || L)) {
          // Match by colour name prefix (White/Blue/Black/Red/Green)
        }
        var colourPrefix = ({ W:'White', U:'Blue', B:'Black', R:'Red', G:'Green' })[L];
        if (al.indexOf(colourPrefix) === 0 && al.indexOf('mana orb') !== -1) found = b;
      });
      return found;
    }).filter(Boolean);
    if (btns.length < 5) return;
    orbHintState.active = true;
    var i = 0;
    function pulseNext() {
      if (!orbHintState.active) return;
      var b = btns[i];
      if (b) {
        var prev = b.style.transform;
        var prevBox = b.style.boxShadow;
        b.style.transition = 'all 0.3s ease';
        b.style.transform = 'scale(1.18)';
        b.style.boxShadow = '0 0 28px rgba(245, 217, 143, 0.95)';
        setTimeout(function () {
          b.style.transform = prev;
          b.style.boxShadow = prevBox;
        }, 320);
      }
      i = (i + 1) % btns.length;
      orbHintState.timer = setTimeout(pulseNext, 420);
    }
    pulseNext();
  }
  function stopOrbHint() {
    orbHintState.active = false;
    if (orbHintState.timer) { clearTimeout(orbHintState.timer); orbHintState.timer = null; }
  }
  document.addEventListener('click', function () {
    orbHintState.lastTap = Date.now();
    stopOrbHint();
    setTimeout(function () {
      if (Date.now() - orbHintState.lastTap >= 10000) startOrbHint();
    }, 10000);
  }, true);

  // ---- Feature 11: Pet XP progress ring ----
  // The app shows xp as a number. We append a small SVG ring below it.
  function decoratePetXP() {
    document.querySelectorAll('[data-tq-pet-xp]').forEach(function (host) {
      // host has data-tq-pet-xp="current,nextLevelAt"
      var raw = host.getAttribute('data-tq-pet-xp');
      var parts = raw.split(',');
      var cur = parseInt(parts[0], 10) || 0;
      var nxt = parseInt(parts[1], 10) || 100;
      var pct = Math.max(0, Math.min(1, cur / nxt));
      host.innerHTML = '';
      var size = 60, r = 26, c = 2 * Math.PI * r;
      var svgNs = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(svgNs, 'svg');
      svg.setAttribute('width', size); svg.setAttribute('height', size); svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
      var bg = document.createElementNS(svgNs, 'circle');
      bg.setAttribute('cx', size/2); bg.setAttribute('cy', size/2); bg.setAttribute('r', r);
      bg.setAttribute('fill', 'none'); bg.setAttribute('stroke', 'rgba(154,135,101,0.25)'); bg.setAttribute('stroke-width', '4');
      svg.appendChild(bg);
      var fg = document.createElementNS(svgNs, 'circle');
      fg.setAttribute('cx', size/2); fg.setAttribute('cy', size/2); fg.setAttribute('r', r);
      fg.setAttribute('fill', 'none'); fg.setAttribute('stroke', '#c9a961'); fg.setAttribute('stroke-width', '4');
      fg.setAttribute('stroke-linecap', 'round');
      fg.setAttribute('stroke-dasharray', c);
      fg.setAttribute('stroke-dashoffset', c - c * pct);
      fg.setAttribute('transform', 'rotate(-90 ' + (size/2) + ' ' + (size/2) + ')');
      svg.appendChild(fg);
      var label = document.createElementNS(svgNs, 'text');
      label.setAttribute('x', size/2); label.setAttribute('y', size/2 + 4);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', '#c9a961');
      label.setAttribute('font-family', "'Cinzel', serif");
      label.setAttribute('font-size', '11');
      label.textContent = cur + '/' + nxt;
      svg.appendChild(label);
      host.appendChild(svg);
    });
  }
  window.TQ.decoratePetXP = decoratePetXP;
  setInterval(decoratePetXP, 1500);

  // ---- Feature 12: Vault deck → external tool links ----
  window.TQ.openInMoxfield = function (commanderName) {
    var url = 'https://www.moxfield.com/decks?fmt=commander&q=' + encodeURIComponent(commanderName);
    window.open(url, '_blank', 'noopener');
  };
  window.TQ.openInEDHREC = function (commanderName) {
    var slug = String(commanderName).toLowerCase()
      .replace(/[',]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    window.open('https://edhrec.com/commanders/' + slug, '_blank', 'noopener');
  };
  window.TQ.openInScryfall = function (commanderName) {
    window.open('https://scryfall.com/search?q=' + encodeURIComponent('!"' + commanderName + '"'), '_blank', 'noopener');
  };

  // ---- Feature 13: First-time onboarding toast ----
  // Shows a one-time hint about the Sanctum 24h after first install.
  function maybeShowOnboarding() {
    try {
      var shown = localStorage.getItem('tq_onboarded_v1');
      if (shown) return;
      var firstSeen = parseInt(localStorage.getItem('tq_first_seen') || '0', 10);
      if (!firstSeen) {
        localStorage.setItem('tq_first_seen', String(Date.now()));
        return;
      }
      // Show after 30 seconds of use on first session (not 24h — would be invisible)
      setTimeout(function () { showOnboardToast(); }, 30000);
    } catch (e) {}
  }
  function showOnboardToast() {
    if (document.getElementById('tq-onboard-toast')) return;
    var t = document.createElement('div');
    t.id = 'tq-onboard-toast';
    t.style.cssText = [
      'position:fixed', 'left:50%', 'transform:translateX(-50%)',
      'bottom:90px', 'z-index:150', 'max-width:320px', 'padding:14px 16px',
      'background:linear-gradient(180deg, rgba(20,14,8,0.96), rgba(10,6,4,0.96))',
      'border:1px solid rgba(201,169,97,0.5)', 'border-radius:6px',
      'color:#e8dcc4', 'font-family:"Crimson Pro", serif', 'font-size:13px',
      'line-height:1.5', 'box-shadow:0 8px 24px rgba(0,0,0,0.6), 0 0 24px rgba(201,169,97,0.15)',
      'animation:tqOnboardIn 0.5s ease-out'
    ].join(';');
    t.innerHTML =
      '<style>@keyframes tqOnboardIn { from {opacity:0;transform:translate(-50%,12px)} to {opacity:1;transform:translate(-50%,0)} }</style>' +
      '<div style="font-family:\'Cinzel\',serif;color:#d4b87a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px">A whisper</div>' +
      '<div>The Token Queen title hides a secret. Tap it seven times to unveil the Sanctum.</div>' +
      '<button id="tq-onboard-close" style="margin-top:10px;padding:4px 12px;background:transparent;border:1px solid rgba(201,169,97,0.4);color:#c9a961;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.15em;border-radius:2px;cursor:pointer">DISMISS</button>';
    document.body.appendChild(t);
    document.getElementById('tq-onboard-close').addEventListener('click', function () {
      t.remove();
      try { localStorage.setItem('tq_onboarded_v1', '1'); } catch (e) {}
    });
    setTimeout(function () { if (t.parentNode) { t.remove(); try { localStorage.setItem('tq_onboarded_v1', '1'); } catch (e) {} } }, 30000);
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    maybeShowOnboarding();
  } else {
    document.addEventListener('DOMContentLoaded', maybeShowOnboarding);
  }

  // ---- Feature 15: Deck export to text ----
  // Accepts { commander, theme, colors, cards: [{name, qty}] } and returns plain text.
  window.TQ.exportDeckAsText = function (deck) {
    if (!deck) return '';
    var lines = [];
    lines.push('// ' + (deck.commander || 'Untitled Commander'));
    if (deck.theme) lines.push('// ' + deck.theme);
    if (deck.colors && deck.colors.length) lines.push('// Identity: ' + deck.colors.join(''));
    lines.push('');
    lines.push('1 ' + (deck.commander || 'Commander'));
    if (Array.isArray(deck.cards)) {
      deck.cards.forEach(function (c) {
        if (typeof c === 'string') lines.push('1 ' + c);
        else if (c && c.name) lines.push((c.qty || 1) + ' ' + c.name);
      });
    }
    return lines.join('\n');
  };
  window.TQ.copyDeckToClipboard = function (deck) {
    var txt = window.TQ.exportDeckAsText(deck);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(txt);
    }
    // Fallback
    var ta = document.createElement('textarea');
    ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  };

  // ---- Feature 16: Vault sort options ----
  // Used by the app to sort its deck array.
  window.TQ.sortDecks = function (decks, mode) {
    if (!Array.isArray(decks)) return decks;
    var order = ['W', 'U', 'B', 'R', 'G'];
    var copy = decks.slice();
    if (mode === 'alpha') {
      copy.sort(function (a, b) { return (a.commander || '').localeCompare(b.commander || ''); });
    } else if (mode === 'identity') {
      copy.sort(function (a, b) {
        var al = (a.colors || []).length, bl = (b.colors || []).length;
        if (al !== bl) return al - bl;
        // Same length: lexicographic by WUBRG order
        var as = (a.colors || []).slice().sort(function (x, y) { return order.indexOf(x) - order.indexOf(y); }).join('');
        var bs = (b.colors || []).slice().sort(function (x, y) { return order.indexOf(x) - order.indexOf(y); }).join('');
        return as.localeCompare(bs);
      });
    }
    // 'manual' or anything else: keep order
    return copy;
  };

  // ---- Toast helper ----
  window.TQ.toast = function (msg, opts) {
    opts = opts || {};
    var el = document.createElement('div');
    el.style.cssText = [
      'position:fixed', 'left:50%', 'transform:translateX(-50%)',
      'bottom:96px', 'z-index:160', 'padding:10px 18px',
      'background:rgba(20,14,8,0.95)', 'border:1px solid rgba(201,169,97,0.45)',
      'border-radius:4px', 'color:#e8dcc4',
      'font-family:"Crimson Pro", serif', 'font-size:13px',
      'box-shadow:0 6px 20px rgba(0,0,0,0.6)',
      'animation:tqToastIn 0.25s ease-out',
      'max-width:80%', 'text-align:center'
    ].join(';');
    if (opts.kind === 'error') el.style.borderColor = '#a05050';
    if (opts.kind === 'success') el.style.borderColor = '#90b070';
    el.innerHTML = '<style>@keyframes tqToastIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}</style>' + String(msg);
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, opts.duration || 2400);
  };

  // ---- Seal riddle (Sanctum hatchery) ----
  // Tap-to-break seal shows a multiple-choice MTG riddle. Correct answer
  // spins the seal and triggers onSuccess.
  var SEAL_RIDDLES = [
    { q: "How many cards make up a Commander deck, including the commander?", a: "100", choices: ["60", "75", "100", "99"] },
    { q: "What is the starting life total in a standard multiplayer Commander game?", a: "40", choices: ["20", "30", "40", "50"] },
    { q: "Which keyword lets a creature attack the turn it enters?", a: "Haste", choices: ["Vigilance", "Haste", "Trample", "Flash"] },
    { q: "How much commander damage from a single commander ends the game?", a: "21", choices: ["15", "20", "21", "25"] },
    { q: "Which colour's mana symbol is a water droplet?", a: "Blue", choices: ["White", "Blue", "Black", "Green"] },
    { q: "Which card type has no mana value and is played as a free action each turn?", a: "Land", choices: ["Sorcery", "Instant", "Land", "Artifact"] },
    { q: "What does \"singleton\" mean in deck construction?", a: "Only one of each non-basic card", choices: ["Solo play only", "Only one of each non-basic card", "One commander only", "One colour only"] },
    { q: "Which ability allows a creature to deal damage to a player or planeswalker beyond a blocker's toughness?", a: "Trample", choices: ["Menace", "Trample", "Lifelink", "Deathtouch"] },
    { q: "How many basic land types exist in Magic?", a: "5", choices: ["3", "5", "6", "7"] },
    { q: "Which zone is your commander kept in when not in play?", a: "Command zone", choices: ["Sideboard", "Exile", "Command zone", "Library"] }
  ];

  window.TQ.openSealRiddle = function (onSuccess) {
    var existing = document.getElementById('tq-seal-riddle');
    if (existing) existing.remove();
    var riddle = SEAL_RIDDLES[Math.floor(Math.random() * SEAL_RIDDLES.length)];
    // Shuffle choices
    var shuffled = riddle.choices.slice().sort(function () { return Math.random() - 0.5; });

    var modal = document.createElement('div');
    modal.id = 'tq-seal-riddle';
    modal.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:150', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:20px',
      'background:rgba(5,3,4,0.94)', 'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)', 'animation:tqFadeIn 0.25s ease-out'
    ].join(';');

    var panel = document.createElement('div');
    panel.style.cssText = [
      'max-width:360px', 'width:100%',
      'background:linear-gradient(180deg, rgba(20,14,8,0.98), rgba(10,6,4,0.98))',
      'border:1px solid rgba(201,169,97,0.5)', 'border-radius:6px',
      'padding:22px 22px 16px', 'color:#e8dcc4',
      'font-family:"Crimson Pro", serif',
      'box-shadow:0 12px 40px rgba(0,0,0,0.7), 0 0 36px rgba(201,169,97,0.18)'
    ].join(';');

    var html = '<style>@keyframes tqFadeIn{from{opacity:0}to{opacity:1}}.tq-riddle-choice{padding:10px 14px;margin:6px 0;background:rgba(20,14,8,0.7);border:1px solid rgba(201,169,97,0.3);border-radius:3px;color:#e8dcc4;font-family:"Crimson Pro",serif;font-size:14px;cursor:pointer;text-align:left;width:100%;transition:all 0.15s}.tq-riddle-choice:active{transform:scale(0.97)}.tq-riddle-correct{border-color:#a0c87a !important;background:rgba(138,170,112,0.2) !important;color:#c0e89a !important}.tq-riddle-wrong{border-color:#d48a86 !important;background:rgba(160,48,44,0.18) !important;color:#d48a86 !important;animation:tqShake 0.4s}@keyframes tqShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}</style>' +
      '<div style="font-family:\'Cinzel\',serif;color:#d4b87a;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;text-align:center;margin-bottom:14px">The Seal Speaks</div>' +
      '<div style="font-size:14px;line-height:1.5;text-align:center;color:#cab896;margin-bottom:14px;font-style:italic">' + escapeHtml2(riddle.q) + '</div>' +
      '<div id="tq-riddle-choices"></div>' +
      '<div style="text-align:center;margin-top:10px"><button id="tq-riddle-close" style="padding:5px 12px;background:transparent;color:#9a8765;border:1px solid rgba(154,135,101,0.3);border-radius:2px;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.18em;cursor:pointer">RETREAT</button></div>';
    panel.innerHTML = html;
    modal.appendChild(panel);
    document.body.appendChild(modal);

    function close() { if (modal.parentNode) modal.parentNode.removeChild(modal); }
    panel.querySelector('#tq-riddle-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

    var choicesEl = panel.querySelector('#tq-riddle-choices');
    shuffled.forEach(function (c) {
      var btn = document.createElement('button');
      btn.className = 'tq-riddle-choice';
      btn.textContent = c;
      btn.addEventListener('click', function () {
        if (c === riddle.a) {
          btn.className = 'tq-riddle-choice tq-riddle-correct';
          if (navigator.vibrate) try { navigator.vibrate([30, 50, 80]); } catch (e) {}
          if (window.TQ && typeof window.TQ.playFanfare === 'function') window.TQ.playFanfare();
          setTimeout(function () {
            close();
            if (typeof onSuccess === 'function') onSuccess();
          }, 600);
        } else {
          btn.className = 'tq-riddle-choice tq-riddle-wrong';
          if (navigator.vibrate) try { navigator.vibrate([60, 30, 60]); } catch (e) {}
          setTimeout(function () { btn.className = 'tq-riddle-choice'; }, 600);
        }
      });
      choicesEl.appendChild(btn);
    });
  };

  // ---- Validate deck wrapper ----
  window.TQ.validateDeck = function (deck) {
    if (!deck || !deck.commander) {
      window.TQ.toast('No commander set for this deck.', { kind: 'error' });
      return;
    }
    var cards = (deck.cards || []).map(function (c) {
      return typeof c === 'string' ? c : (c && c.name) || null;
    }).filter(Boolean);

    // Modal frame
    var modal = document.createElement('div');
    modal.id = 'tq-validate-modal';
    modal.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:170', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:20px',
      'background:rgba(5,3,4,0.92)', 'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)'
    ].join(';');

    var panel = document.createElement('div');
    panel.style.cssText = [
      'max-width:420px', 'width:100%', 'max-height:80vh', 'overflow-y:auto',
      'background:linear-gradient(180deg, rgba(20,14,8,0.98), rgba(10,6,4,0.98))',
      'border:1px solid rgba(201,169,97,0.45)', 'border-radius:6px',
      'padding:18px 20px', 'color:#e8dcc4',
      'font-family:"Crimson Pro", serif', 'font-size:13px',
      'box-shadow:0 12px 40px rgba(0,0,0,0.7), 0 0 32px rgba(201,169,97,0.12)'
    ].join(';');

    panel.innerHTML =
      '<div style="font-family:\'Cinzel\',serif;color:#d4b87a;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:8px">Colour-Identity Check</div>' +
      '<div style="font-size:14px;font-weight:600;margin-bottom:4px">' + escapeHtml2(deck.commander) + '</div>' +
      '<div id="tq-validate-status" style="color:#9a8765;font-style:italic;font-size:12px;margin:8px 0 12px">Looking up commander…</div>' +
      '<div id="tq-validate-body" style="font-size:13px;line-height:1.5"></div>' +
      '<div style="margin-top:14px;text-align:right"><button id="tq-validate-close" style="padding:6px 16px;background:transparent;color:#c9a961;border:1px solid rgba(201,169,97,0.45);border-radius:3px;font-family:\'Cinzel\',serif;font-size:11px;letter-spacing:0.18em;cursor:pointer">CLOSE</button></div>';

    modal.appendChild(panel);
    document.body.appendChild(modal);

    function close() { if (modal.parentNode) modal.parentNode.removeChild(modal); }
    panel.querySelector('#tq-validate-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

    var statusEl = panel.querySelector('#tq-validate-status');
    var bodyEl = panel.querySelector('#tq-validate-body');

    if (cards.length === 0) {
      statusEl.textContent = '';
      bodyEl.innerHTML = '<div style="color:#9a8765;font-style:italic">No card list saved for this deck yet. Add cards in the deck editor to enable identity validation.</div>';
      return;
    }

    statusEl.textContent = 'Validating ' + cards.length + ' card(s) against commander identity…';

    window.TQ.validateDeckIdentity(deck.commander, cards).then(function (result) {
      var idColours = (result.commanderIdentity || []).map(function (c) {
        return '<img src="https://svgs.scryfall.io/card-symbols/' + c + '.svg" alt="{' + c + '}" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;margin:0 1px;border-radius:50%">';
      }).join('') || '<span style="color:#9a8765">colourless</span>';

      statusEl.innerHTML = 'Commander identity: ' + idColours;

      var html = '';
      if (result.ok) {
        html += '<div style="color:#a0c87a;font-weight:600">✓ All cards fit the commander\'s colour identity.</div>';
      } else {
        html += '<div style="color:#cf8a8a;font-weight:600;margin-bottom:6px">' + result.violators.length + ' violator(s):</div>';
        html += '<ul style="margin:0;padding-left:18px;color:#cab896">';
        result.violators.forEach(function (v) {
          var pips = v.illegal.map(function (c) {
            return '<img src="https://svgs.scryfall.io/card-symbols/' + c + '.svg" alt="{' + c + '}" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin:0 1px;border-radius:50%">';
          }).join('');
          html += '<li style="margin-bottom:4px">' + escapeHtml2(v.name) + ' — outside identity: ' + pips + '</li>';
        });
        html += '</ul>';
      }
      if (result.unknown && result.unknown.length) {
        html += '<div style="margin-top:10px;color:#9a8765;font-size:12px;font-style:italic">Could not look up ' + result.unknown.length + ' card(s) on Scryfall.</div>';
      }
      bodyEl.innerHTML = html;
    }).catch(function (err) {
      statusEl.textContent = '';
      bodyEl.innerHTML = '<div style="color:#cf8a8a">Validation failed: ' + escapeHtml2(err.message || 'unknown error') + '</div>';
    });
  };

  // ---- Deck list import ----
  // Parses a deck-list paste into { commander, cards: [{name, qty}], theme? }.
  // Supports:
  //   - "1 Card Name" (Moxfield/Arena/MTGGoldfish standard)
  //   - "1x Card Name" (TappedOut)
  //   - "// Commander: Card Name" or "// CMDR: ..."  (explicit marker)
  //   - Lines containing "*CMDR*" suffix (Moxfield export)
  //   - "SIDEBOARD" or "Sideboard" header — treated as commander pool if exactly 1 card
  //   - Blank lines, comments starting with // or # are skipped (except commander markers)
  window.TQ.parseDeckList = function (text) {
    if (!text || typeof text !== 'string') return null;
    var lines = text.replace(/\r\n/g, '\n').split('\n');
    var commander = null;
    var theme = null;
    var cards = [];
    var inSideboard = false;
    var sideCards = [];

    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i];
      var line = raw.trim();
      if (!line) continue;

      // Explicit commander markers
      var cmdMatch = line.match(/^\/\/\s*(?:commander|cmdr)\s*[:=-]?\s*(.+)$/i);
      if (cmdMatch) { commander = cmdMatch[1].trim(); continue; }
      var themeMatch = line.match(/^\/\/\s*(?:theme|deck)\s*[:=-]?\s*(.+)$/i);
      if (themeMatch) { theme = themeMatch[1].trim(); continue; }

      // Sideboard / commander section header
      if (/^(sideboard|commander|cmdr)\s*[:=-]?\s*$/i.test(line)) { inSideboard = true; continue; }
      if (/^deck\s*[:=-]?\s*$/i.test(line)) { inSideboard = false; continue; }

      // Skip comment lines
      if (line.charAt(0) === '/' || line.charAt(0) === '#') continue;

      // Moxfield-style *CMDR* suffix
      var moxfieldCmdr = line.match(/^(\d+)\s+(.+?)\s+\*CMDR\*\s*$/i) ||
                        line.match(/^(\d+)x?\s+(.+?)\s+#!Commander\s*$/i);
      if (moxfieldCmdr) {
        commander = moxfieldCmdr[2].trim().replace(/\s*\([A-Z0-9]+\)\s*\d*$/i, '');
        continue;
      }

      // Standard card line: "1 Card Name" or "1x Card Name"
      var cardMatch = line.match(/^(\d+)x?\s+(.+)$/);
      if (cardMatch) {
        var qty = parseInt(cardMatch[1], 10);
        var name = cardMatch[2].trim()
          // Strip set/collector annotations: "Card (SET) 123" → "Card"
          .replace(/\s*\([A-Z0-9]+\)\s*[\dA-Za-z\-★]*$/i, '')
          // Strip foil markers
          .replace(/\s*\*F\*$/i, '');
        var entry = { name: name, qty: qty };
        if (inSideboard) sideCards.push(entry);
        else cards.push(entry);
      } else {
        // Bare card name without quantity
        if (line.length < 80 && !/^https?:/.test(line)) {
          var entry2 = { name: line, qty: 1 };
          if (inSideboard) sideCards.push(entry2);
          else cards.push(entry2);
        }
      }
    }

    // If no explicit commander but sideboard has exactly 1 card, treat it as commander
    if (!commander && sideCards.length === 1) {
      commander = sideCards[0].name;
    }

    return { commander: commander, theme: theme, cards: cards, _sideCards: sideCards };
  };

  // Look up a commander on Scryfall and return { name, colorIdentity, scryfall_id }
  // Uses a 7-day cache.
  window.TQ.lookupCommander = function (name) {
    if (!name) return Promise.reject(new Error('No commander name'));
    var ck = 'commander:' + name.toLowerCase();
    var cached = cacheGet(ck);
    if (cached) return Promise.resolve(cached);
    return fetchJSON(SCRYFALL_API + '/cards/named?fuzzy=' + encodeURIComponent(name))
      .then(function (card) {
        if (!card || card.object === 'error') throw new Error('Not found');
        // Verify it's a legendary creature or planeswalker that can be a commander
        var typeLine = card.type_line || '';
        var canBeCommander = /Legendary.*(Creature|Planeswalker)/i.test(typeLine) ||
                             /can be your commander/i.test(card.oracle_text || '');
        var result = {
          name: card.name,
          colorIdentity: card.color_identity || [],
          scryfall_id: card.id,
          scryfall_uri: card.scryfall_uri,
          type_line: typeLine,
          canBeCommander: canBeCommander
        };
        cacheSet(ck, result);
        return result;
      });
  };

  // The big import popup: handles both Quick (commander only) and Full Deck modes.
  // onSave(deck) — callback when user confirms; deck = { commander, colors, theme, cards }
  window.TQ.openDeckImport = function (onSave) {
    var existing = document.getElementById('tq-deck-import');
    if (existing) existing.remove();

    var modal = document.createElement('div');
    modal.id = 'tq-deck-import';
    modal.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:170', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:14px',
      'background:rgba(5,3,4,0.94)', 'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)'
    ].join(';');

    var panel = document.createElement('div');
    panel.style.cssText = [
      'max-width:440px', 'width:100%', 'max-height:90vh',
      'background:linear-gradient(180deg, rgba(20,14,8,0.98), rgba(10,6,4,0.98))',
      'border:1px solid rgba(201,169,97,0.5)', 'border-radius:6px',
      'padding:18px', 'color:#e8dcc4',
      'font-family:"Crimson Pro", serif',
      'box-shadow:0 12px 40px rgba(0,0,0,0.7), 0 0 36px rgba(201,169,97,0.15)',
      'display:flex', 'flex-direction:column'
    ].join(';');

    panel.innerHTML =
      '<div style="font-family:\'Cinzel\',serif;color:#d4b87a;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:10px;text-align:center">Import Deck</div>' +
      '<div id="tq-import-tabs" style="display:flex;gap:4px;margin-bottom:12px">' +
        '<button data-tab="quick" class="tq-imp-tab" style="flex:1;padding:8px;background:rgba(201,169,97,0.18);color:#d4b87a;border:1px solid rgba(201,169,97,0.45);border-radius:3px;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.12em;cursor:pointer">QUICK</button>' +
        '<button data-tab="full" class="tq-imp-tab" style="flex:1;padding:8px;background:transparent;color:#9a8765;border:1px solid rgba(154,135,101,0.3);border-radius:3px;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.12em;cursor:pointer">FULL LIST</button>' +
        '<button data-tab="bulk" class="tq-imp-tab" style="flex:1;padding:8px;background:transparent;color:#9a8765;border:1px solid rgba(154,135,101,0.3);border-radius:3px;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.12em;cursor:pointer">BULK</button>' +
      '</div>' +
      '<div id="tq-imp-quick">' +
        '<label style="display:block;font-size:11px;color:#9a8765;letter-spacing:0.15em;text-transform:uppercase;font-family:\'Cinzel\',serif;margin-bottom:6px">Commander name</label>' +
        '<input id="tq-imp-cmd" type="text" placeholder="e.g. Atraxa, Praetors\' Voice" style="width:100%;padding:10px 12px;background:rgba(20,14,8,0.7);border:1px solid rgba(201,169,97,0.3);border-radius:3px;color:#e8dcc4;font-family:\'Crimson Pro\',serif;font-size:14px;outline:none;box-sizing:border-box" />' +
        '<label style="display:block;font-size:11px;color:#9a8765;letter-spacing:0.15em;text-transform:uppercase;font-family:\'Cinzel\',serif;margin:12px 0 6px">Deck theme (optional)</label>' +
        '<input id="tq-imp-theme" type="text" placeholder="e.g. Superfriends Proliferate" style="width:100%;padding:10px 12px;background:rgba(20,14,8,0.7);border:1px solid rgba(201,169,97,0.3);border-radius:3px;color:#e8dcc4;font-family:\'Crimson Pro\',serif;font-size:14px;outline:none;box-sizing:border-box" />' +
      '</div>' +
      '<div id="tq-imp-full" style="display:none">' +
        '<label style="display:block;font-size:11px;color:#9a8765;letter-spacing:0.15em;text-transform:uppercase;font-family:\'Cinzel\',serif;margin-bottom:6px">Paste deck list</label>' +
        '<textarea id="tq-imp-list" rows="10" placeholder="// Commander: Atraxa, Praetors&#39; Voice\n// Theme: Superfriends\n1 Sol Ring\n1 Arcane Signet\n1 Doubling Season\n..." style="width:100%;padding:10px 12px;background:rgba(20,14,8,0.7);border:1px solid rgba(201,169,97,0.3);border-radius:3px;color:#e8dcc4;font-family:\'JetBrains Mono\',monospace;font-size:12px;line-height:1.4;outline:none;box-sizing:border-box;resize:vertical"></textarea>' +
        '<div style="font-size:10px;color:#6a5a42;margin-top:6px;font-style:italic;line-height:1.5">Supports Moxfield, MTGGoldfish, Arena and TappedOut formats. Commander is auto-detected from <code style="color:#9a8765">*CMDR*</code> markers, <code style="color:#9a8765">// Commander: Name</code>, or a single-card Sideboard section.</div>' +
      '</div>' +
      '<div id="tq-imp-bulk" style="display:none">' +
        '<label style="display:block;font-size:11px;color:#9a8765;letter-spacing:0.15em;text-transform:uppercase;font-family:\'Cinzel\',serif;margin-bottom:6px">Commander names — one per line</label>' +
        '<textarea id="tq-imp-bulk-list" rows="10" placeholder="Atraxa, Praetors&#39; Voice\nKrenko, Mob Boss\nGhoulcaller Gisa\nSauron, the Dark Lord\nDina, Essence Brewer" style="width:100%;padding:10px 12px;background:rgba(20,14,8,0.7);border:1px solid rgba(201,169,97,0.3);border-radius:3px;color:#e8dcc4;font-family:\'JetBrains Mono\',monospace;font-size:12px;line-height:1.5;outline:none;box-sizing:border-box;resize:vertical"></textarea>' +
        '<div style="font-size:10px;color:#6a5a42;margin-top:6px;font-style:italic;line-height:1.5">Just commanders, one per line. Each will be looked up on Scryfall and added with its real colour identity. Lines starting with <code style="color:#9a8765">//</code> are ignored. You can add a theme after a comma with <code style="color:#9a8765">|</code>, e.g. <code style="color:#9a8765">Atraxa, Praetors\' Voice | Superfriends</code></div>' +
      '</div>' +
      '<div id="tq-imp-status" style="margin-top:12px;font-size:12px;color:#9a8765;font-style:italic;min-height:18px"></div>' +
      '<div id="tq-imp-preview" style="margin-top:8px;display:none;padding:10px;background:rgba(20,14,8,0.5);border:1px solid rgba(154,135,101,0.25);border-radius:3px;max-height:200px;overflow-y:auto"></div>' +
      '<div style="display:flex;gap:8px;margin-top:14px">' +
        '<button id="tq-imp-cancel" style="flex:1;padding:10px;background:transparent;color:#9a8765;border:1px solid rgba(154,135,101,0.3);border-radius:3px;font-family:\'Cinzel\',serif;font-size:11px;letter-spacing:0.18em;cursor:pointer">CANCEL</button>' +
        '<button id="tq-imp-fetch" style="flex:1;padding:10px;background:rgba(201,169,97,0.15);color:#d4b87a;border:1px solid rgba(201,169,97,0.45);border-radius:3px;font-family:\'Cinzel\',serif;font-size:11px;letter-spacing:0.18em;cursor:pointer">LOOK UP</button>' +
        '<button id="tq-imp-save" style="flex:1;padding:10px;background:linear-gradient(180deg,#f5d98f,#c9a961);color:#1a110a;border:1px solid #c9a961;border-radius:3px;font-family:\'Cinzel\',serif;font-size:11px;letter-spacing:0.18em;cursor:pointer;font-weight:700;opacity:0.5" disabled>SAVE</button>' +
      '</div>';

    modal.appendChild(panel);
    document.body.appendChild(modal);

    function close() { if (modal.parentNode) modal.parentNode.removeChild(modal); }

    var tabs = panel.querySelectorAll('.tq-imp-tab');
    var quickEl = panel.querySelector('#tq-imp-quick');
    var fullEl = panel.querySelector('#tq-imp-full');
    var bulkEl = panel.querySelector('#tq-imp-bulk');
    var statusEl = panel.querySelector('#tq-imp-status');
    var previewEl = panel.querySelector('#tq-imp-preview');
    var saveBtn = panel.querySelector('#tq-imp-save');
    var fetchBtn = panel.querySelector('#tq-imp-fetch');
    var resolvedDecks = []; // array — bulk may have many, quick/full just one

    function currentTab() {
      if (bulkEl.style.display !== 'none') return 'bulk';
      if (fullEl.style.display !== 'none') return 'full';
      return 'quick';
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var which = t.getAttribute('data-tab');
        tabs.forEach(function (other) {
          var on = other === t;
          other.style.background = on ? 'rgba(201,169,97,0.18)' : 'transparent';
          other.style.color = on ? '#d4b87a' : '#9a8765';
          other.style.borderColor = on ? 'rgba(201,169,97,0.45)' : 'rgba(154,135,101,0.3)';
        });
        quickEl.style.display = which === 'quick' ? 'block' : 'none';
        fullEl.style.display = which === 'full' ? 'block' : 'none';
        bulkEl.style.display = which === 'bulk' ? 'block' : 'none';
        statusEl.textContent = '';
        previewEl.style.display = 'none';
        previewEl.innerHTML = '';
        resolvedDecks = [];
        saveBtn.disabled = true; saveBtn.style.opacity = '0.5';
        saveBtn.textContent = 'SAVE';
      });
    });

    panel.querySelector('#tq-imp-cancel').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

    // Parse a bulk-list textarea into [{ name, theme }]
    function parseBulkList(text) {
      var out = [];
      (text || '').replace(/\r\n/g, '\n').split('\n').forEach(function (raw) {
        var line = raw.trim();
        if (!line) return;
        if (line.indexOf('//') === 0 || line.indexOf('#') === 0) return;
        // Allow "Name | Theme"
        var pipe = line.indexOf('|');
        if (pipe !== -1) {
          var n = line.slice(0, pipe).trim();
          var th = line.slice(pipe + 1).trim();
          if (n) out.push({ name: n, theme: th || null });
        } else {
          out.push({ name: line, theme: null });
        }
      });
      return out;
    }

    function renderPipsHtml(colours) {
      return (colours.length ? colours : ['C']).map(function (c) {
        return '<img src="https://svgs.scryfall.io/card-symbols/' + c + '.svg" alt="{' + c + '}" style="width:14px;height:14px;vertical-align:-3px;margin:0 1px;border-radius:50%">';
      }).join('');
    }

    fetchBtn.addEventListener('click', function () {
      var tab = currentTab();
      previewEl.style.display = 'none';
      previewEl.innerHTML = '';
      saveBtn.disabled = true; saveBtn.style.opacity = '0.5';
      resolvedDecks = [];

      if (tab === 'bulk') {
        var raw = panel.querySelector('#tq-imp-bulk-list').value;
        var lines = parseBulkList(raw);
        if (!lines.length) {
          statusEl.style.color = '#cf8a8a';
          statusEl.textContent = 'Paste one commander per line.';
          return;
        }
        statusEl.style.color = '#9a8765';
        statusEl.textContent = 'Looking up ' + lines.length + ' commander(s) on Scryfall…';
        previewEl.style.display = 'block';
        previewEl.innerHTML = '';
        fetchBtn.disabled = true; fetchBtn.style.opacity = '0.5';

        var results = []; // { name, status: 'ok'|'fail', info?, theme }
        var idx = 0;
        function next() {
          if (idx >= lines.length) {
            // Done — render preview + enable save if any succeeded
            var okCount = results.filter(function (r) { return r.status === 'ok'; }).length;
            var failCount = results.length - okCount;
            statusEl.style.color = okCount ? '#a0c87a' : '#cf8a8a';
            statusEl.textContent = 'Found ' + okCount + ' / ' + results.length + (failCount ? ' (' + failCount + ' not found)' : '');
            previewEl.innerHTML = results.map(function (r) {
              if (r.status === 'ok') {
                return '<div style="padding:4px 0;border-bottom:1px solid rgba(154,135,101,0.15);font-size:12px">' +
                  '<span style="color:#d4b87a;font-weight:600">' + escapeHtml2(r.info.name) + '</span>' +
                  ' <span style="margin-left:6px">' + renderPipsHtml(r.info.colorIdentity) + '</span>' +
                  (r.theme ? ' <span style="color:#9a8765;font-size:11px;font-style:italic;margin-left:6px">' + escapeHtml2(r.theme) + '</span>' : '') +
                '</div>';
              }
              return '<div style="padding:4px 0;border-bottom:1px solid rgba(154,135,101,0.15);font-size:12px;color:#cf8a8a">✗ ' + escapeHtml2(r.name) + ' — not found</div>';
            }).join('');
            resolvedDecks = results.filter(function (r) { return r.status === 'ok'; }).map(function (r) {
              return {
                commander: r.info.name,
                colors: r.info.colorIdentity,
                theme: r.theme || '',
                cards: []
              };
            });
            if (resolvedDecks.length) {
              saveBtn.disabled = false; saveBtn.style.opacity = '1';
              saveBtn.textContent = 'SAVE ' + resolvedDecks.length;
            }
            fetchBtn.disabled = false; fetchBtn.style.opacity = '1';
            return;
          }
          var item = lines[idx++];
          statusEl.textContent = 'Looking up ' + idx + ' / ' + lines.length + ': ' + item.name;
          window.TQ.lookupCommander(item.name).then(function (info) {
            results.push({ name: item.name, status: 'ok', info: info, theme: item.theme });
          }).catch(function () {
            results.push({ name: item.name, status: 'fail', theme: item.theme });
          }).then(function () {
            // Gentle throttle — Scryfall asks for ~10 requests/sec max
            setTimeout(next, 110);
          });
        }
        next();
        return;
      }

      // quick / full — same as before, but writes into resolvedDecks
      var commanderName, theme, cards;
      if (tab === 'full') {
        var rawFull = panel.querySelector('#tq-imp-list').value;
        var parsed = window.TQ.parseDeckList(rawFull);
        if (!parsed || !parsed.commander) {
          statusEl.style.color = '#cf8a8a';
          statusEl.textContent = 'Could not find a commander in the list. Add "// Commander: Name" at the top.';
          return;
        }
        commanderName = parsed.commander;
        theme = parsed.theme;
        cards = parsed.cards;
      } else {
        commanderName = panel.querySelector('#tq-imp-cmd').value.trim();
        theme = panel.querySelector('#tq-imp-theme').value.trim();
        cards = [];
        if (!commanderName) {
          statusEl.style.color = '#cf8a8a';
          statusEl.textContent = 'Enter a commander name.';
          return;
        }
      }

      statusEl.style.color = '#9a8765';
      statusEl.textContent = 'Looking up "' + commanderName + '" on Scryfall…';

      window.TQ.lookupCommander(commanderName).then(function (info) {
        if (!info.canBeCommander) {
          statusEl.style.color = '#d4b87a';
          statusEl.textContent = 'Warning: "' + info.name + '" may not be a legal commander. Saving anyway.';
        } else {
          statusEl.style.color = '#a0c87a';
          statusEl.textContent = 'Found: ' + info.name;
        }
        var themeText = theme ? '<div style="font-size:11px;color:#9a8765;font-style:italic;margin-top:4px">' + escapeHtml2(theme) + '</div>' : '';
        var cardsText = cards.length ? '<div style="font-size:11px;color:#9a8765;margin-top:4px">' + cards.length + ' cards in list</div>' : '';
        previewEl.innerHTML =
          '<div style="font-family:\'Cinzel\',serif;color:#d4b87a;font-size:13px;letter-spacing:0.1em">' + escapeHtml2(info.name) + '</div>' +
          '<div style="margin-top:6px">' + renderPipsHtml(info.colorIdentity) + '</div>' +
          themeText + cardsText +
          '<div style="font-size:10px;color:#6a5a42;margin-top:6px;font-style:italic">' + escapeHtml2(info.type_line) + '</div>';
        previewEl.style.display = 'block';
        resolvedDecks = [{
          commander: info.name,
          colors: info.colorIdentity,
          theme: theme || '',
          cards: cards
        }];
        saveBtn.disabled = false; saveBtn.style.opacity = '1';
        saveBtn.textContent = 'SAVE';
      }).catch(function () {
        statusEl.style.color = '#cf8a8a';
        statusEl.textContent = 'Could not find "' + commanderName + '" on Scryfall. Check the spelling.';
      });
    });

    saveBtn.addEventListener('click', function () {
      if (!resolvedDecks.length) return;
      close();
      if (typeof onSave === 'function') {
        // For backward compat: if only one, pass single; else pass array
        if (resolvedDecks.length === 1) onSave(resolvedDecks[0]);
        else onSave(resolvedDecks);
      }
    });

    // Auto-focus first input
    setTimeout(function () {
      var inp = panel.querySelector('#tq-imp-cmd');
      if (inp) inp.focus();
    }, 100);
  };

})();
