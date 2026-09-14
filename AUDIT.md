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

## 5. Correction: the history is fine

An earlier draft of this audit said the repo had a single commit and no
history. That was wrong, and the mistake was mine: I cloned with `--depth 1`,
so `git log` showed exactly one commit because that is all a shallow clone
fetches. The repo has forty-odd commits.

Two real notes stand in its place.

The commit messages are all "Add files via upload", which is what GitHub's web
uploader writes. That still makes a regression hard to trace — you can see
*that* a file changed but never why. Worth writing a real message when the
change is one you might need to understand later.

And `token-queen-upload.zip` and `tq_fresh-v9.zip` were committed by accident,
adding about 2.6 MB to the repository permanently — git keeps every version of
a binary forever. Both are removed in this commit and `*.zip` is now ignored.
Removing them from history entirely would need a rewrite, which is not worth
it for 2.6 MB on a personal repo.

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

## 10. The look — consolidating, not redesigning

`app.js` held **118 distinct hex values across 615 literals**. But nine of them
accounted for most of the usage: `#c9a961` alone appeared 178 times. The
palette was already there — it just wasn't written down, so every new screen
drifted a shade off the last one.

The Vault had drifted furthest. It carried its own set: a cooler gold
(`#c8a84b` against the app's `#c9a961`), lighter text (`#e8e4d8` against
`#e8dcc4`), and — the one you'd actually feel — a **grey** muted tone
(`#6b6870`) where the rest of the app uses a warm brown (`#9a8765`). That's
the main reason it didn't read as one app.

Now there are nine named colour tokens plus type and spacing, declared in
`index.html` so there's no flash on launch, and mirrored in
`src/theme/tokens.js`. 419 colour literals in `app.js` became tokens; the
Vault and simulator both point at the same set. Canvas colours stay as raw hex
in three places, because `ctx.fillStyle` can't resolve a CSS variable.

**Type had no scale.** Five sizes — 7, 8, 9, 10 and 11px — all inside four
pixels, which produces no hierarchy at all and is genuinely hard to read at
arm's length in the light people play cards in. The 7px and 8px uses are gone;
there's now a real scale from an 11px tracked label up to a 40px figure, with
the numbers that matter during a game at the top of it.

**Tap targets.** The Vault's deck-card action row sat at roughly 28px tall
with five buttons side by side. Everything tappable now has a 44px minimum,
set once as a global rule with the nav and chip strips exempted.

**A regression I caused, fixed.** Adding the Odds tab took the bottom nav from
five columns to six. At the old 0.22em tracking, "Reference" overflowed its
column on a 375px phone. Tracking is down to 0.1em and the label is now
"Rules", which is what that tab actually holds.

Three smoke-test checks guard all of this, so the palette can't quietly drift
again.

## 11. The dragon

Two problems, one of them a straightforward bug.

**It never flapped.** The wing phase was

```js
Math.sin((d.flapT > 0 ? d.flapT : Date.now() / 120) * 0.5)
```

`flapT` is set to 6 on a tap and counts down to 0, so during a flap the phase
ran `sin(3)` to `sin(0)` — a total travel of 0.14, which is nothing. Between
flaps it switched to a completely different time base. The net effect was a
wing that drifted slowly while gliding and then froze the instant you tapped:
exactly backwards. There is now one continuous `wingPhase` advanced by the
game loop, fast while a flap is live and slow between taps, and each tap
starts it at the top of the downstroke so the beat lines up with your finger.

**It was chubby because it was an ellipse.** The body was 16x12 with a single
small wing drawn in the outline colour, which merged into the body and
vanished. It's now 16x8 with a tapered chest, a spine ridge, a longer neck
with a proper snout, swept-back horns, a tail that tapers to a spade, and two
wings — a near one and a dimmed far one, which is most of what makes a
silhouette read as a dragon rather than a bird.

Each wing is now a fixed membrane shape **rotated about the shoulder** rather
than a tip position interpolated between extremes. The interpolated version
collapsed into a spike at the top and bottom of the stroke; rotation is how a
wing actually moves, and it holds its shape through the whole beat.

I rendered it off-device at several phases and at true in-game size before
shipping it, rather than guessing.

## 12. The Seal

Seven taps on the title still opens the Sanctum, but the only feedback used to
be a faint text-shadow at tap five. There was no sense of working a lock.

`src/sanctum/seal.js` draws a sigil that fills as you tap: each tap traces
another seventh of the outer ring and lights another rune, the rings spin
faster from tap five, the keyhole at the centre widens, and the seventh tap
flares and breaks it open. It fades out with the three-second tap streak, so a
stray double-tap on the title never leaves it hanging on screen.

Pure SVG, `pointer-events: none`, sits below the Sanctum's z-index so it
doesn't touch that hierarchy. It respects `prefers-reduced-motion`.

## 13. A load-order trap, found by accident

Building a preview harness for the seal threw `Cannot destructure property
'useState' of 'React'`. `src/vault/vault.js` was binding hooks at module scope,
which made it silently dependent on `modules.js` loading after the React
vendor script. True in `index.html` today; a trap for whoever reorders it.
Hooks are now resolved at call time.

## 14. The art

**Mana pips.** R was a brown blob with squiggles and G a dark smear, because
every glyph was drawn in a colour close to its own background. Real pips are
spheres — lit from the upper left, darker at the lower right, with a
high-contrast glyph. All six now have that shading, and R is a flame, G a
tree, B a skull with a jaw, C a faceted gem. Each one was rendered and checked
rather than guessed.

**Token fallbacks.** These were the weakest thing in the app: the zombie was a
rounded rectangle with two dots, the goblin an orange blob with a smiley face.
Each was a handful of primitives floating in an otherwise empty 500x700 card.
All twelve are now heraldic medallions — a bold silhouette inside an engraved
ring, filling the art box, sharing one visual language.

Worth being straight about the ceiling here: these only ever appear when the
Scryfall fetch fails, and hand-drawn vector creatures will never match real
card art. The job of a fallback is to look *deliberate* rather than broken,
and the medallion framing does that where the old blobs didn't. The goblin and
the wolf are still the weakest of the set.

## 15. The pet

Three things, in order of how much they mattered.

**The frame.** The companion sat in a flat 2px box — the one thing in the app
meant to feel owned, presented as a cropped image. It now has a gradient frame
running from bright gold through the pet's own colour, an inset hairline and
an interior vignette. The insets had to be folded into the glow animation's
custom properties, because that animation owns `box-shadow` outright and would
otherwise have wiped them on the first keyframe.

**The nameplate.** The creature's name was a 7px label tucked into a corner of
the art at 60% opacity. There's now a proper plate below the frame: a mood pip
that shifts from the pet's own colour through gold to red as mood drops, the
name in tracked Cinzel, and the mood value in mono on the right. The old
separate corner dot is gone — it was duplicating what the pip now says.

**The Hatchery.** The empty state was a dashed rectangle, an egg and two lines
of text, and it's the first thing anyone sees in there. `src/pet/hatchery.js`
draws a carved plinth under a runic arch, lit by a pool of light, with the
same seven-part seal the Sanctum unlock uses — so the two secrets read as
related rather than unconnected. The seven runes light as you unlock orbs, so
the backdrop tracks your progress instead of sitting inert. It's generated as
a data URI, which means no structural change to the compiled `app.js`.

## 16. Card scanning

`src/scan/` reads a card from a photo and resolves it against Scryfall.

**OCR has to be native.** Tesseract in a WebView means shipping megabytes of
wasm and waiting seconds a frame on a mid-range phone. ML Kit is on-device,
free and fast. `src/scan/ocr.js` is an adapter that detects whichever
Capacitor wrapper is installed at runtime — `@jcesarmobile/capacitor-ocr`,
`@capacitor-community/image-to-text`, or the Pantrist ML Kit plugin — and
normalises their three different result shapes into lines with bounding boxes.
Until one is installed the scanner opens and explains itself rather than
failing silently. The two packages are now in `package.json`; they need
`npx cap sync android` to take effect.

**The identification logic is where the work is**, and it's pure, so it's
testable without a camera. Two paths:

1. *Set code and collector number.* Modern cards print both bottom-left, and
   the pair identifies an exact printing.
2. *The card name.* Weighted by position — the name sits in the top eighth of
   the card, which is a far stronger signal than anything about the text
   itself — then fuzzy-matched with OCR-confusion variants generated for it.

**A failure mode my own test caught.** The collector-number path originally
returned at confidence 1.00 with no cross-check. Feeding it a plausible-but-
wrong number returned *Vampire Interloper* for a photo of Grimgrin, at full
confidence. Confidently wrong is much worse than no match, so the printing
result is now checked against the name we read and discarded if they disagree.

**Variant ordering mattered more than expected.** "Cralerhoof Behemolh"
wouldn't resolve because the I/l/1 rule ran first and spent the whole variant
budget on useless permutations before reaching t/l/i, which is the rule that
actually fixes a blurred photo. Reordering by how often each rule rescues a
name fixed it.

Verified live against Scryfall: Grimgrin resolves from a misread name with a
contradictory collector line, Sol Ring from "5ol Ring" with no geometry at
all, Craterhoof Behemoth from "Cralerhoof Behemolh".

Scanned cards accumulate into a list and land in the Vault's deck-list field,
which the Odds tab already reads — so a deck can go from a pile of cards to a
consistency score without typing anything. Every result is shown for
confirmation first; silently adding the wrong card is worse than asking.

## 17. Fanned-pile scanning

Scanning a hundred cards one at a time is not a feature anyone would use
twice. `identifyMany()` reads several cards from a single photo: fan the pile
so each title bar shows, shoot once, and it clusters the OCR lines into
per-card bands by vertical gap — a fanned pile is a stack of name-height bands
separated by gaps, and the median line height sets the scale for what counts
as a gap.

It needs bounding boxes. Without geometry there's no way to tell two cards
from two lines of the same card, so it returns one band and the caller falls
back to single-card mode.

Confident hits are added straight off; anything doubtful still gets shown for
confirmation.

**Variant ordering, again.** "Cultlvate" wouldn't resolve, and Scryfall's own
fuzzy match refuses it too — one character out. Global substitution can't fix
a single-character misread: replacing every t/l/i in "Cultlvate" gives
"Cutttvate". Single-position swaps were the answer, but walking positions left
to right spent the whole budget on the first three characters and never
reached the one swap that works. Round-robin by rank — every position's most
likely swap before any position's second — fixed it, at rank 9 of 12.

Five fanned cards including two misreads: five out of five.

## 18. Simulator: the mulligan

The biggest source of the engine's optimism was that it kept on land count
alone — seven lands and a six-drop was a keep, which it is in no real game. A
hand now also needs something to do with the mana: at least one castable spell
and at least one costing three or under. On six or fewer the bar drops to one
castable card, because at that point you keep and hope.

Tuning mattered. Requiring two castable spells put a well-built deck's keep
rate at 67%, which is far too harsh — real Commander keep rates sit around
80-85%. One castable plus one cheap spell lands Goreclaw at 84.3% and Grimgrin
at 85.1%, which matches experience.

**On the draw** is now a toggle rather than a buried parameter. At a
four-player table you're on the draw three games in four, so the on-the-play
figure is the optimistic one — and the gap is not small. Goreclaw scores 84.6
on the play and 89.2 on the draw; its commander lands by turn four in 85% of
games against 91%.

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
- `www/app.js` — Sanctum tap counter moved to a ref; 419 colour literals and
  the type floor moved onto tokens; six-tab nav fixed.
- `src/theme/tokens.js` — 17 design tokens; 522 of 615 colour literals in
  app.js now reference them (137 raw values left, nearly all single-use, plus
  the canvas palette which must stay literal).
- `src/sanctum/seal.js` — the unlock sigil.
- `src/pet/hatchery.js` — the hatchery backdrop.
- `src/scan/` — card scanning: OCR adapter, identification, scanner panel.
- `gen-mana-svg.js`, `gen-svg-fallbacks.js` — pips and token art redrawn.
- `www/app.js` — dragon renderer rewritten; wing beat driven from the loop.
- `www/index.html` — tokens declared up front, global 44px tap minimum.
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
