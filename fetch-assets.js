#!/usr/bin/env node
/**
 * Fetch Scryfall art for counters and memory-game tokens.
 * Runs once locally to populate www/img/. Generated files are committed.
 *
 * Scryfall API guidelines: include User-Agent + Accept headers, throttle requests.
 * https://scryfall.com/docs/api
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const UA = 'TokenQueen/2.0 (https://github.com/GGG123FFF/token-queen)';
const OUT_DIR = path.join(__dirname, 'www', 'img');
const COUNTERS_DIR = path.join(OUT_DIR, 'counters');
const TOKENS_DIR = path.join(OUT_DIR, 'tokens');

[OUT_DIR, COUNTERS_DIR, TOKENS_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Use most recent / cleanest printing for each
// Counters: official "counter" tokens from Scryfall
const COUNTERS = [
  { id: 'energy',     name: 'Energy Reserve',       set: 'tmh3', cn: '36' },
  { id: 'poison',     name: 'Poison Counter',       set: 'tone', cn: '14' },
  { id: 'experience', name: 'Experience Counter',   set: 'tc16', cn: '21' },
  { id: 'oil',        name: 'Oil Counter',          set: 'tone', cn: '15' },
  { id: 'rad',        name: 'Rad Counter',          set: 'tpip', cn: '22' }
];

// Memory game token pool — common Magic tokens with good art
const TOKENS = [
  { id: 'goblin',    name: 'Goblin Token',    q: '!"Goblin" type:token power:1 toughness:1' },
  { id: 'soldier',   name: 'Soldier Token',   q: '!"Soldier" type:token power:1 toughness:1' },
  { id: 'zombie',    name: 'Zombie Token',    q: '!"Zombie" type:token power:2 toughness:2' },
  { id: 'dragon',    name: 'Dragon Token',    q: '!"Dragon" type:token power:5 toughness:5' },
  { id: 'angel',     name: 'Angel Token',     q: '!"Angel" type:token power:4 toughness:4' },
  { id: 'wolf',      name: 'Wolf Token',      q: '!"Wolf" type:token power:2 toughness:2' },
  { id: 'elemental', name: 'Elemental Token', q: '!"Elemental" type:token power:3 toughness:1' },
  { id: 'saproling', name: 'Saproling Token', q: '!"Saproling" type:token power:1 toughness:1' },
  { id: 'spirit',    name: 'Spirit Token',    q: '!"Spirit" type:token power:1 toughness:1' },
  { id: 'bird',      name: 'Bird Token',      q: '!"Bird" type:token power:1 toughness:1' },
  { id: 'insect',    name: 'Insect Token',    q: '!"Insect" type:token power:1 toughness:1' },
  { id: 'thopter',   name: 'Thopter Token',   q: '!"Thopter" type:token power:1 toughness:1' }
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': UA,
        'Accept': 'application/json'
      }
    }, res => {
      let chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(get(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}: ${body.toString().slice(0,200)}`));
        }
        resolve({ headers: res.headers, body });
      });
    }).on('error', reject);
  });
}

async function fetchJSON(url) {
  const { body } = await get(url);
  return JSON.parse(body.toString());
}

async function fetchImage(url, dest) {
  const { body } = await get(url);
  fs.writeFileSync(dest, body);
  return body.length;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const manifest = { counters: {}, tokens: {}, generated: new Date().toISOString() };

  console.log('Fetching counters...');
  for (const c of COUNTERS) {
    try {
      const url = `https://api.scryfall.com/cards/${c.set}/${c.cn}`;
      const card = await fetchJSON(url);
      const art = card.image_uris?.art_crop;
      if (!art) { console.log(`  SKIP ${c.id}: no art_crop`); continue; }
      const dest = path.join(COUNTERS_DIR, `${c.id}.jpg`);
      const size = await fetchImage(art, dest);
      manifest.counters[c.id] = {
        scryfall_id: card.id,
        name: card.name,
        set: card.set,
        collector_number: card.collector_number,
        artist: card.artist || null,
        local: `img/counters/${c.id}.jpg`,
        scryfall_uri: card.scryfall_uri,
        art_crop: art
      };
      console.log(`  OK  ${c.id}  (${(size/1024).toFixed(0)} KB) -- ${card.artist || 'unknown'}`);
    } catch (e) {
      console.log(`  FAIL ${c.id}: ${e.message}`);
    }
    await sleep(120);
  }

  console.log('\nFetching memory-game tokens...');
  for (const t of TOKENS) {
    try {
      const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(t.q)}&unique=art&order=released&dir=desc`;
      const result = await fetchJSON(url);
      const card = result.data && result.data[0];
      if (!card) { console.log(`  SKIP ${t.id}: no result`); continue; }
      const art = card.image_uris?.art_crop || card.card_faces?.[0]?.image_uris?.art_crop;
      if (!art) { console.log(`  SKIP ${t.id}: no art_crop`); continue; }
      const dest = path.join(TOKENS_DIR, `${t.id}.jpg`);
      const size = await fetchImage(art, dest);
      manifest.tokens[t.id] = {
        scryfall_id: card.id,
        name: card.name,
        set: card.set,
        artist: card.artist || null,
        local: `img/tokens/${t.id}.jpg`,
        scryfall_uri: card.scryfall_uri,
        art_crop: art
      };
      console.log(`  OK  ${t.id}  (${(size/1024).toFixed(0)} KB) -- ${card.name} (${card.set}) by ${card.artist || 'unknown'}`);
    } catch (e) {
      console.log(`  FAIL ${t.id}: ${e.message}`);
    }
    await sleep(120);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to www/img/manifest.json`);
  console.log(`Counters: ${Object.keys(manifest.counters).length}/${COUNTERS.length}`);
  console.log(`Tokens:   ${Object.keys(manifest.tokens).length}/${TOKENS.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
