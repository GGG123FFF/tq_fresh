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

  await new Promise(r => setTimeout(r, 1000));

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
