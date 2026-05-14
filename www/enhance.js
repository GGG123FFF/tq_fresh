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
  var FALLBACKS = {
    counters: {
      energy:     { local: 'img/counters/energy.svg',     set: 'tmh3', cn: '36', name: 'Energy Reserve' },
      poison:     { local: 'img/counters/poison.svg',     set: 'tone', cn: '14', name: 'Poison Counter' },
      experience: { local: 'img/counters/experience.svg', set: 'tc16', cn: '21', name: 'Experience Counter' },
      oil:        { local: 'img/counters/oil.svg',        set: 'tone', cn: '15', name: 'Oil Counter' },
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

  console.log('[TQ] Enhancements loaded.');
})();
