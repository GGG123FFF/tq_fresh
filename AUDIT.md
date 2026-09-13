# Token Queen — audit

Against `GGG123FFF/tq_fresh` @ `26c52fe`.

---

## 1. There is no source for the app

`www/app.js` is 13,114 lines of Babel output — regenerator runtime, `_typeof`
helpers, 1,177 `React.createElement` calls. The JSX that produced it is not in
the repo, and `build.js` doesn't compile any JSX: it runs Tailwind and checks
that files exist. The build artifact **is** the source.

This is the root cause of most of what follows. Every change from here is an
edit to compiled output: no JSX, no components smaller than the file, no way
to reason about a feature without scrolling past the other twelve. It also
means the repo can't be rebuilt from scratch — if `app.js` is ever lost or
corrupted, the app is gone.

## 2. `enhance.js` and React are fighting over the same DOM

A 2,087-line IIFE loaded *before* `app.js`. It uses a `MutationObserver` to
find and decorate elements React rendered, patches `<img>` `onerror` globally,
injects modals with raw DOM, and builds the entire Reference tab through a
hand-rolled `makeEl`.

It works, and the intent is sound — this is how features got added without
touching the compiled bundle. But decorations applied from outside React get
wiped by any re-render, which is why the observer has to keep re-applying
them. It's a standing source of intermittent bugs that are miserable to
reproduce.

The good news: `window.TQ` is a genuinely sensible extension seam, and the
Reference tab already proves the pattern — `app.js` renders an empty div and
calls `window.TQ.mountReference(el)`. That's the hook the simulator now uses,
and it's the way out of this file (see §7).

## 3. Three separate storage layers, no namespace, no quota handling

`app.js` has a `storage` helper (`localStorage` + JSON, swallowing errors).
`enhance.js` keeps its own 24-hour art cache. Neither namespaces its keys and
neither notices when `localStorage` fills up — `set` silently swallows the
quota error, so a full cache fails invisibly and stays failed.

A WebView gives you roughly 5–10 MB. Scryfall card objects are large. Worth
a single `tq_`-prefixed store with real quota handling and an eviction policy.
(The simulator's cache already prefixes `tq_scry:` and strips Scryfall objects
to the seven fields it reads, roughly a tenth of the size.)

## 4. Dead Android package — fixed

`android/app/src/main/java/app/summoningledger/tracker/MainActivity.java` was
a leftover from the rename. The `namespace` and `applicationId` are both
`com.sodiumfabrications.tokenqueen`, so it was never referenced. Removed.

## 4b. Updates couldn't install over the top — fixed

There was no `signingConfig` anywhere, so debug builds fell back to Gradle's
auto-generated `~/.android/debug.keystore`. That file is created per machine,
and a GitHub Actions runner is a fresh machine every run — so **every CI build
was signed with a different key**. Android refuses to update an app when the
signature changes, which means each new APK demanded an uninstall first, and
uninstalling clears the WebView's `localStorage`: every deck, life total, pet
and setting, gone.

`versionCode` was also pinned at `1` and never moved, so nothing could tell
two builds apart.

Fixed: a fixed keystore committed at `android/app/tokenqueen-debug.keystore`,
wired into both debug and release builds, and `versionCode` / `versionName`
now come from the CI run number (`TQ_VERSION_CODE`, `TQ_VERSION_NAME`, with
sane local defaults).

A committed debug-grade keystore is the right call for a sideloaded personal
app — the point is that the signature stays *stable*, not that it stays
secret. If Token Queen ever goes to the Play Store it needs a real release key
in GitHub Secrets instead, and that key must never be lost, because it's the
only thing that can ever update the listing.

**One catch on the changeover.** The APK already on the phone was signed with
the old throwaway key, so the *first* build after this change still won't
install over it. Export a backup from the app first, uninstall, install the
new APK, restore. Every update after that installs cleanly over the top.

## 4c. The Sanctum door dropped taps — fixed

`handleTitleTap` read the counter out of state:

```js
var next = titleTapCount + 1;   // stale closure
setTitleTapCount(next);
```

Two taps landing inside the same React batch both read the same
`titleTapCount`, computed the same `next`, and one of them vanished. The
faster you tap, the more often it happens — so the door needed eight or nine
taps rather than seven, and the glow at five taps lagged behind your finger.

The count now lives in `titleTapRef` (source of truth) and is mirrored into
state only to drive the glow. A functional `setState` updater would also have
worked, but the handler fires haptics off `next`, and React can call an
updater twice.

The `window.TQ.openSealRiddle` path the door calls does exist in `enhance.js`,
so the fallback branch in `app.js` was never the problem.

## 5. One commit, no history

`26c52fe "Add files via upload"` is the entire log. Nothing to bisect when
something breaks, no record of why anything is the way it is. Not fixable
retroactively — just worth committing in real increments from here.

## 6. What's already good

Worth saying, because it's better than it looks from the file sizes.
`smoke-test.js` boots the real app in jsdom and checks it mounts — that's a
genuinely useful test, not a token one, and it caught nothing broken in this
change because it was watching. The CI workflow is clean. The
`network_security_config.xml` and Capacitor allowlist are properly scoped
rather than blanket cleartext. The Scryfall art fallbacks honour the attribution
requirement.

---

## 7. The fork in the road

**Option A — accept `app.js` as source.** Cheapest. The debt compounds.

**Option B — recover the JSX and restructure.** The 1,177 `createElement`
calls convert mechanically. The risk isn't there, it's in the ~3,000 lines of
hooks, state and helpers around them, where a subtle behavioural change
wouldn't show up until you're mid-game. It's a lost weekend with a real chance
of ending worse than you started.

**Option C — stop growing `app.js`. Recommended, started, and now proven on a
real component.**

New features go in `src/` as real ES modules, bundled by esbuild, mounted
through `window.TQ`. `app.js` only ever gains the four or five lines that
register the tab. Then migrate the existing tabs out one at a time — Vault
first, since it's already a self-contained `CommanderVault` component — each
one a small change the smoke test can verify.

No big-bang rewrite. `app.js` shrinks a tab at a time until it's a shell, and
at any point you can stop and still have a working app. The simulator merge is
the first instance of this pattern, and it's in and passing.

---

## 8. First migration done — the Vault

`CommanderVault` and its three sibling components are out of `app.js` and into
`src/vault/` as real source. 1,456 lines moved. `app.js` is down from 13,114
lines to 11,690, and from 465 KB to 422 KB.

The extraction is deliberately conservative: the component bodies are the
original code, so it can be diffed against what was there. What did change are
the patterns that are purely Babel artefacts and entirely regular —

```js
var _useState14 = useState(""),               const [formTheme, setFormTheme] = useState("");
  _useState15 = _slicedToArray(_useState14, 2),
  formTheme = _useState15[0],          ->
  setFormTheme = _useState15[1];

function VaultDeckCard(_ref21) {              function VaultDeckCard({ deck, onEdit, onDelete }) {
  var deck = _ref21.deck,             ->
    onEdit = _ref21.onEdit, ...
```

Eleven `useState` pairs and four prop objects, plus every `/*#__PURE__*/`
marker. `_objectSpread` and `_toConsumableArray` are stubbed in
`src/vault/helpers.js` with three-line native implementations; they'll go as
the internals get rewritten.

**This is now covered by a real test**, not just a bundling check.
`smoke-test.js` mounts `CommanderVault` into a detached div and asserts it
renders content — so the next extraction has something to fail against.

`COLORS` stayed in `app.js` as well as moving into the Vault module. It's
referenced by the pet ceremony around line 4322, so the module carries its own
copy rather than reaching back into `app.js`. That's module independence, not
duplication debt.

## 9. The two halves are now one app

The Vault deck form takes an optional deck list. A deck that has one gets an
**Odds** button on its card, which hands the deck to the simulator and jumps to
that tab. The simulator runs it, shows which deck it's working on, and writes
the score back — so the button then reads `Odds · 85` on the card.

Verified end to end in jsdom: button fires, tab switches, list arrives,
commander shows, zero errors.

Decks without a list show the button disabled with a tooltip pointing at Edit,
rather than hiding it — the feature stays discoverable.

## What changed in this pass

- `src/simulator/` — the simulator as real ES module source (engine, card
  classification, Scryfall with fuzzy scan correction, reporting, UI).
- `www/simulator.js` — build output, 41 KB, bundled by esbuild.
- `build.js` — now *builds* rather than only verifying; added the esbuild step
  and put `simulator.js` and `enhance.js` in the required-artefact check,
  which they weren't in before.
- `www/app.js` — nine lines added: one mount div, one nav entry.
- `www/index.html` — one script tag.
- `smoke-test.js` — three new checks covering the tab.
- `package.json` — esbuild as a dev dependency.
- Dead Android package removed.
- `www/app.js` — Sanctum tap counter moved to a ref.
- `android/app/build.gradle` — fixed signing key, `versionCode` from the
  environment.
- `android/app/tokenqueen-debug.keystore` — new, committed on purpose.
- `.github/workflows/build.yml` — passes the run number through; the artifact
  is now named by version.

`node build.js && node smoke-test.js` → **18 passed, 0 failed**.

## Next, in the order I'd do it

1. **Flappy Dragon and the pet system** out of `app.js`. Probably the biggest
   single block left, and the most self-contained — the game loop is already
   `useRef`-based and barely touches app state.
2. **Single namespaced storage layer** with quota handling, and move both
   `enhance.js`'s art cache and the simulator's card cache onto it. Right now
   a full `localStorage` fails silently in three different places.
3. **The Reference tab out of `enhance.js`** into `src/reference/`. It's the
   largest chunk of the MutationObserver monkey-patching and the least
   entangled with React, so it's the cleanest way to start shrinking that file.
4. **Rewrite the Vault internals** now that they're readable — drop the two
   remaining Babel helpers, split the four components into their own files.
   No rush; it's isolated and tested now.
