# dark fantasy love archetypes

Six stickers for a niche that defines kinds of lover, drawn and rigged by the [fun-isometric](../../skills/fun-isometric/SKILL.md) rules. Each one is an object and a verb that stands for a personality, so the motion carries the character. Nothing under `skills/` was edited: `fun.ts` here is a one line re-export of the real kit, and the icons import the real presets.

| Icon | Archetype | Motion (from `kit/motions.ts`) | Parts |
| --- | --- | --- | --- |
| `lockheart` | The Guarded | `clasp` + `shackle` on a brass love lock, the heart takes the slam on `nudge` | heart and rim, lock body, shackle, keyhole |
| `dagger` | The Reckless | `latch` + `impact`, blood drops on `twinkle` + `fall`, a `glint` on the steel | heart, blade (whole behind, clipped in front), guard, grip, pommel, wound, two drops |
| `potion` | The Intoxicated | `toss`, the liquid slopping on `tossLag2` clipped to the glass | flask, liquid, label heart, cork, collar, two vapour hearts |
| `rose` | The Tragic Romantic | `hop`, one petal lets go on `fall` and a fresh one pops back in | three scalloped rings and a swirl, stem, two leaves, thorn, petal |
| `orb` | The Fated | `float`, the heart on `hop`, four stars on `twinkle` and a `glint`, all clipped to the glass | base, ball, heart, stars, gold ring, highlight |
| `candle` | The Devoted | `flicker` flame, a wax drop on `fall`, hearts lifting off on `twinkle` | candle, melt drip, wick, two flames, chamberstick, ring, drop |

`ARCHETYPES` in `icons.ts` holds each title and its one line, so the set defines the niche and not just a pile of objects. Edit the lines freely; they are copy, not code.

## Where the dark is

In the palettes, not the drawing. The kit says colours are slots and palettes ship separately, so `palettes/` holds three dark sets as plain JSON, `crypt` (violet, blood and brass, the default look), `blood` and `venom`. Slot roles are kept (`hot` still means hearts and flame, `gold` brass, `deep` the dark second colour) and only the colours go dark: `white` is moonlight, `grey` iron, `paper` parchment, `ink` a violet black. Because every icon uses slots only, the same six also play in the original `riso`, and the original icons wear the dark palettes. `previews/compare.png` shows all three.

## Look at it

Open `preview.html`. It plays the set with the real kit player, with a palette switcher, a night and bone background, slow motion, replay, and three originals underneath on the same palette. `previews/` has `compare.png` (originals, the same drawings in riso, then in crypt), `palettes.png`, and the alpha `*.webm` with a `*.png` poster for each icon, in crypt.

## Run it

From the repo root:

```bash
bun skills/fun-isometric/bin/fi.mjs check experiments/darkfantasy/icons.ts
```

```bash
bun skills/fun-isometric/bin/fi.mjs sheet experiments/darkfantasy/icons.ts dagger --cells 30 --palette experiments/darkfantasy/palettes/crypt.json
```

```bash
bun skills/fun-isometric/bin/fi.mjs export experiments/darkfantasy/icons.ts orb --px 400 --palette experiments/darkfantasy/palettes/crypt.json --out experiments/darkfantasy/previews
```

```bash
bun experiments/darkfantasy/build-preview.mjs
```

## Keep it

Move the six icon definitions and their small helpers (`glow`, `inset`, `put`, `heartAt`) into `skills/fun-isometric/kit/icons.ts` and add them to `ICONS`. To ship the dark looks, add the three palettes to `PALETTES` in `kit/fun.ts` as partial sets over `RISO`. Two things follow, so decide them on purpose:

- `site/Page.tsx` maps over `ICONS` and `PALETTES`, so the icons and palettes appear on the public site.
- `SKILL.md` says "24 worked icons" and six more make it 30.

## Drop it

```bash
rm -rf experiments/darkfantasy
```
