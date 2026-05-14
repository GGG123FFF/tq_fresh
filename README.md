# Token Queen

An MTG companion app for Android — token tracker, life totals, counters, Commander Vault, and games — built with React + Capacitor, brought to you by Sodium Fabrications.

## Features

- **Battlefield** — Token creator and tracker with Scryfall art for common creature tokens (Goblin, Soldier, Zombie, Dragon, Angel, Wolf, and more).
- **Life** — Multiplayer life total tracker with poison, energy, experience, oil, and rad counters. Tap any counter pip to see the official Scryfall counter card art.
- **Tools** — Dice, coin flip, planar deck, and other Commander-friendly utilities.
- **The Sanctum** — A hidden companion screen (unlocked by tapping the title seven times) housing the pet, the Memory mini-game, and game stats.
- **Commander Vault** — Track your Commander decks, colour identities, themes, and play history.

## Project structure

```
.
├── android/                  # Capacitor Android project (gradle build)
├── www/                      # Web bundle that Capacitor wraps
│   ├── index.html
│   ├── enhance.js            # Runtime hybrid loader (counter art + image fallbacks)
│   ├── app.js                # Compiled React app (Babel-transformed JSX)
│   ├── tailwind.css          # Compiled Tailwind CSS (generated)
│   ├── vendor/               # React + ReactDOM UMD bundles
│   └── img/                  # Bundled SVG fallbacks for offline use
│       ├── counters/         # Energy, poison, experience, oil, rad
│       └── tokens/           # 12 memory-game token fallbacks
├── build.js                  # Compiles Tailwind + verifies www/ artefacts
├── smoke-test.js             # 12 automated checks (jsdom)
├── gen-svg-fallbacks.js      # Regenerates the bundled SVG fallbacks
├── fetch-assets.js           # (Optional) pulls real Scryfall art into www/img/
├── tailwind.config.js        # Tailwind config — extends the dark MTG palette
└── tailwind.src.css          # @tailwind directives source
```

## Building locally

```bash
npm ci
npm run build        # Compiles Tailwind, verifies www/ assets
npm test             # Runs the smoke test (12 checks in jsdom)
npx cap sync android # Copies www/ into the Android project
cd android && ./gradlew assembleDebug
```

The debug APK lands at `android/app/build/outputs/apk/debug/app-debug.apk`.

## CI

Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/build.yml`, which:

1. Installs Node 20, Java 17, and project deps
2. Runs `node build.js` (Tailwind + asset verification)
3. Runs `node smoke-test.js`
4. `npx cap sync android`
5. Builds the debug APK with Gradle
6. Uploads the APK as a workflow artefact

## Asset strategy

Counter card art and memory-game token art use a **hybrid loader**:

1. **Try Scryfall at runtime.** `enhance.js` calls the Scryfall API on first view, caching the resolved `art_crop` URL in `localStorage` for 24 hours. Real card art with artist attribution.
2. **Fall back to bundled SVG.** If the network fails or Scryfall returns an error, the app uses a themed SVG placeholder shipped in `www/img/`. The app stays fully functional offline.

To refresh the bundled SVGs after editing `gen-svg-fallbacks.js`:

```bash
npm run gen-svg
```

To pull real Scryfall art into the repo (requires internet, observes Scryfall's rate limits):

```bash
npm run fetch-assets
```

## Scryfall attribution

When displaying `art_crop` from Scryfall, the app shows the artist name and set in the counter card popup, per the [Scryfall image guidelines](https://scryfall.com/docs/api/images). Card images are © Wizards of the Coast.

## Tailwind theme

The MTG palette (mana colours, gold parchment, dark obsidian backgrounds) is centralised in `tailwind.config.js` under `theme.extend.colors`. Use `mtg-gold`, `mtg-parchment`, `mana-w/u/b/r/g`, etc. instead of hex literals in new components.

## Tech

- **React 18** (production UMD, no JSX runtime — `app.js` is Babel-compiled into `React.createElement` calls)
- **Tailwind v3.4** (JIT, scans `www/**/*.{html,js}`)
- **Capacitor 8** with `@capacitor/haptics` and `@capacitor/splash-screen`
- **Android target** — minSdk and targetSdk inherit from `android/variables.gradle`
