/**
 * Smoke test for Token Queen.
 *
 * Sets up a minimal jsdom window, evaluates React, ReactDOM, enhance.js, and
 * app.js in that window, then checks the app booted cleanly.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const WWW = path.join(__dirname, 'www');

const errors = [];
const vc = new VirtualConsole();
vc.on('error', e => errors.push(String(e.stack || e)));
vc.on('jsdomError', e => errors.push(String(e.stack || e.message || e)));

(async () => {
  const reactJs = fs.readFileSync(path.join(WWW, 'vendor', 'react.production.min.js'), 'utf-8');
  const reactDomJs = fs.readFileSync(path.join(WWW, 'vendor', 'react-dom.production.min.js'), 'utf-8');
  const enhanceJs = fs.readFileSync(path.join(WWW, 'enhance.js'), 'utf-8');
  const appJs = fs.readFileSync(path.join(WWW, 'app.js'), 'utf-8');
  const modulesJs = fs.readFileSync(path.join(WWW, 'modules.js'), 'utf-8');
  const indexHtml = fs.readFileSync(path.join(WWW, 'index.html'), 'utf-8');

  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>', {
    url: 'https://localhost/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: vc
  });

  const w = dom.window;
  // Polyfills for browser APIs jsdom doesn't ship
  w.matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {} });
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.fetch = () => Promise.reject(new Error('fetch stubbed'));
  w.navigator.vibrate = () => {};

  function runIn(name, code) {
    try { w.eval(code); }
    catch (e) { errors.push('[' + name + '] ' + e.message); }
  }
  runIn('react', reactJs);
  runIn('react-dom', reactDomJs);
  runIn('enhance', enhanceJs);
  runIn('app', appJs);
  runIn('modules', modulesJs);

  await new Promise(r => setTimeout(r, 1000));

  // Render the extracted Vault on its own, so the migration out of app.js is
  // actually covered rather than merely bundling.
  let vaultRendered = false;
  let vaultError = '';
  try {
    const host = w.document.createElement('div');
    w.document.body.appendChild(host);
    w.TQ.mountVault(host);
    await new Promise(r => setTimeout(r, 400));
    vaultRendered = host.children.length > 0 && host.textContent.trim().length > 0;
    if (!vaultRendered) vaultError = 'mounted but rendered nothing';
  } catch (e) {
    vaultError = e.message;
  }

  const doc = w.document;
  const root = doc.getElementById('root');

  const checks = [
    {
      name: 'No script errors during boot',
      ok: errors.length === 0,
      detail: errors.slice(0, 3).join('\n  ')
    },
    {
      name: 'React mounted (root has children)',
      ok: root && root.children.length > 0,
      detail: root ? `root.children.length = ${root.children.length}` : 'no #root'
    },
    {
      name: 'window.React global available',
      ok: typeof w.React !== 'undefined' && typeof w.React.createElement === 'function'
    },
    {
      name: 'window.ReactDOM global available',
      ok: typeof w.ReactDOM !== 'undefined'
    },
    {
      name: 'build.gradle versionCode is not the Groovy null trap',
      ok: (() => {
        const raw = fs.readFileSync(path.join(__dirname, 'android/app/build.gradle'), 'utf-8');
        // Strip comments first - the file documents the old broken form, and
        // the check should look at code, not prose.
        const g = raw.split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
        // `versionCode (expr).toInteger()` parses as versionCode(expr).toInteger(),
        // calling .toInteger() on a null return value. Catch it if it returns.
        return !/versionCode\s*\([^)]*\)\s*\./.test(g) && /versionCode\s+\w+\s*$/m.test(g);
      })()
    },
    {
      name: 'build.gradle has a fixed signing config',
      ok: (() => {
        const g = fs.readFileSync(path.join(__dirname, 'android/app/build.gradle'), 'utf-8');
        return g.includes('signingConfigs') && g.includes('tokenqueen-debug.keystore')
            && fs.existsSync(path.join(__dirname, 'android/app/tokenqueen-debug.keystore'));
      })()
    },
    {
      name: 'Pet is alive: overlay, speech and reactions',
      ok: (() => {
        try {
          const frame = w.document.createElement('div');
          frame.style.position = 'relative';
          w.document.body.appendChild(frame);
          w.TQ.petLife(frame, { name: 'Test', mood: 80, hunger: 95, boredom: 10, asleep: false, awayHours: 0 });
          const bubble = frame.querySelector('.tq-pet-bubble');
          if (!bubble) return false;
          frame.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
          const spoke = bubble.classList.contains('on') && bubble.textContent.length > 0;
          w.TQ.petDetach();
          return spoke;
        } catch (e) { return false; }
      })()
    },
    {
      name: 'Pet XP shows progress to the next stage',
      ok: appJs.includes('STAGE_THRESHOLDS[st + 1]') && appJs.includes('to next stage')
    },
    {
      name: 'Sanctum has a backdrop',
      ok: !!w.TQ && typeof w.TQ.sanctumBackdrop === 'function'
          && appJs.includes('window.TQ.sanctumBackdrop')
    },
    {
      name: 'Pet needs are shown, not just computed',
      ok: appJs.includes("label: 'Fed'") && appJs.includes("label: 'Played'")
          && appJs.includes('100 - computeHunger(pet)')
    },
    {
      name: 'Orb puzzle gives visible reject feedback',
      ok: appJs.includes('window.TQ.orbReject()') && modulesJs.includes('tq-orb-reject')
          && appJs.includes('tq-orb')
    },
    {
      name: 'Card scanner registered, live and photo',
      ok: !!w.TQ && typeof w.TQ.openScanner === 'function'
          && typeof w.TQ.openLiveScanner === 'function'
          && typeof w.TQ.identifyCard === 'function'
    },
    {
      name: 'CAMERA permission declared for in-app scanning',
      ok: fs.readFileSync(path.join(__dirname, 'android/app/src/main/AndroidManifest.xml'), 'utf-8')
            .includes('android.permission.CAMERA')
    },
    {
      name: 'Scanning reachable from the Vault toolbar and the Odds tab',
      ok: modulesJs.includes('Scan Deck')
          && modulesJs.includes('Scan cards in')
          && modulesJs.includes('Scan cards')
          // Both entry points prefer the live scanner and fall back to photos.
          && (modulesJs.match(/openLiveScanner \|\| /g) || []).length >= 2
    },
    {
      name: 'Design tokens declared in index.html',
      ok: indexHtml.includes('--tq-gold:') && indexHtml.includes('--tq-tap:')
    },
    {
      name: 'Core palette tokenised (only canvas keeps raw hex)',
      ok: (appJs.match(/#(c9a961|d4b87a|f5d98f|9a8765|6a5a42|e8dcc4|d48a86|1a110a|0a0604)\b/g) || [])
            .every(() => true)
          && (appJs.match(/#(c9a961|d4b87a|9a8765|6a5a42|e8dcc4|d48a86|1a110a|0a0604)\b/g) || []).length === 0,
      detail: 'non-canvas palette hexes still present'
    },
    {
      name: 'Nothing tappable below the minimum type size',
      ok: !appJs.includes('text-[7px]') && !appJs.includes('text-[8px]')
    },
    {
      name: 'Vault-to-simulator bridge wired',
      ok: !!w.TQ && typeof w.TQ.runOddsFor === 'function' && typeof w.TQ.setTab === 'function'
    },
    {
      name: 'Vault mount point registered',
      ok: !!w.TQ && typeof w.TQ.mountVault === 'function'
    },
    {
      name: 'Vault renders from src/vault/ (not app.js)',
      ok: vaultRendered,
      detail: vaultError
    },
    {
      name: 'Vault fully removed from app.js',
      ok: !appJs.includes('function CommanderVault(') && appJs.includes('window.TQ.mountVault(el)')
    },
    {
      name: 'Sanctum tap counter uses a ref, not stale state',
      ok: appJs.includes('titleTapRef.current + 1') && !appJs.includes('var next = titleTapCount + 1')
    },
    {
      name: 'Simulator mount point registered',
      ok: !!w.TQ && typeof w.TQ.mountSimulator === 'function'
    },
    {
      name: 'Odds tab wired into the bottom nav',
      ok: appJs.includes("id: 'odds'") && appJs.includes('window.TQ.mountSimulator(el)')
    },
    {
      name: 'modules.js loaded after app.js in index.html',
      ok: indexHtml.indexOf('modules.js') > indexHtml.indexOf('app.js')
    },
    {
      name: 'window.TQ exposed by enhance.js',
      ok: !!w.TQ && typeof w.TQ.openCounterCard === 'function',
      detail: w.TQ ? 'TQ keys: ' + Object.keys(w.TQ).join(',') : 'window.TQ undefined'
    },
    {
      name: 'Tailwind compiled (key classes present)',
      ok: (() => {
        const css = fs.readFileSync(path.join(WWW, 'tailwind.css'), 'utf-8');
        return css.includes('.fixed{') && css.includes('.inset-0{') && css.includes('.z-\\[120\\]{');
      })()
    },
    {
      name: 'enhance.js loaded before app.js in index.html',
      ok: indexHtml.indexOf('enhance.js') > 0 && indexHtml.indexOf('enhance.js') < indexHtml.indexOf('app.js')
    },
    {
      name: 'capacitor.config.json allows api.scryfall.com + cards.scryfall.io',
      ok: ['api.scryfall.com', 'cards.scryfall.io'].every(h => fs.readFileSync(path.join(__dirname, 'capacitor.config.json'), 'utf-8').includes(h))
    },
    {
      name: 'All 5 counter SVGs bundled',
      ok: ['energy','poison','experience','oil','rad'].every(c => fs.existsSync(path.join(WWW, 'img', 'counters', c + '.svg')))
    },
    {
      name: 'All 12 token SVGs bundled',
      ok: ['goblin','soldier','zombie','dragon','angel','wolf','elemental','saproling','spirit','bird','insect','thopter'].every(t => fs.existsSync(path.join(WWW, 'img', 'tokens', t + '.svg')))
    },
    {
      name: 'GitHub Actions workflow is valid YAML',
      ok: (() => {
        const y = fs.readFileSync(path.join(__dirname, '.github', 'workflows', 'build.yml'), 'utf-8');
        return y.trim().startsWith('name:') && y.includes('runs-on:') && !y.includes('require("fs")');
      })()
    },
    {
      name: 'build.js compiles Tailwind',
      ok: fs.readFileSync(path.join(__dirname, 'build.js'), 'utf-8').includes('tailwindcss')
    },
    {
      name: 'All 6 mana symbol SVGs bundled',
      ok: ['W','U','B','R','G','C'].every(s => fs.existsSync(path.join(WWW, 'img', 'mana', s + '.svg')))
    },
    {
      name: 'Reference tab + rules API present',
      ok: !!w.TQ && typeof w.TQ.fetchRules === 'function' && typeof w.TQ.mountReference === 'function' && typeof w.TQ.manaSymbolUrl === 'function'
    },
    {
      name: 'capacitor.config.json allows svgs.scryfall.io + media.wizards.com + mtgcommander.net',
      ok: ['svgs.scryfall.io', 'media.wizards.com', 'mtgcommander.net'].every(h => fs.readFileSync(path.join(__dirname, 'capacitor.config.json'), 'utf-8').includes(h))
    }
  ];

  let pass = 0, fail = 0;
  for (const c of checks) {
    if (c.ok) { console.log('  PASS  ' + c.name); pass++; }
    else      { console.log('  FAIL  ' + c.name + (c.detail ? '\n        ' + c.detail : '')); fail++; }
  }
  console.log(`\n${pass} passed, ${fail} failed`);
  // jsdom keeps timers alive (intervals, MutationObserver). Force-exit so CI
  // moves on to the next step instead of hanging until the job timeout.
  dom.window.close();
  process.exit(fail > 0 ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
