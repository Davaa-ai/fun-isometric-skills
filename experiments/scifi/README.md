# sci-fi experiment

Three new stickers, drawn and rigged by the [fun-isometric](../../skills/fun-isometric/SKILL.md) rules to see whether the kit stretches to a new theme without bending. Nothing under `skills/` was edited: `fun.ts` here is a one line re-export of the real kit, and the icons import the real presets.

| Icon | Verb | Motion (from `kit/motions.ts`) | Parts |
| --- | --- | --- | --- |
| `rocket` | lifts off, hovers, lands | `bounce` scaled with `k`, the flame on `flicker` lit and cut by `twinkle` | nose, body, two fins, window, nozzle, two layer flame |
| `robot` | looks around | `wobble`, `look` on clipped pupils, antenna on `flick` | head, screen, two ears, antenna, two eyes |
| `ufo` | beams a star up | `drift`, rim lights and the star on `twinkle`, the star on `slide` | hull, rim, dome, alien, five lights, beam |

Held to the house rules: 500 canvas, outline 5, `VIEWS.right` extrusion, palette slots only (no hex), every body a slab with its own depth, sparkles on the beat, and no hand written easing. The rocket's plane is spun so its nose points along the direction `bounce` already travels, so the stock preset lifts it along its own axis.

## Look at it

`previews/compare.png` has the new three beside three originals, `previews/palettes.png` the new set in six more looks, and `previews/*.webm` + `*.png` are the alpha video and poster. For the live thing, open `preview.html` in a browser: it plays them with the real kit player, with a palette switcher, slow motion and a row of originals beside them.

## Run it

From the repo root:

```bash
bun skills/fun-isometric/bin/fi.mjs check experiments/scifi/icons.ts
```

```bash
bun skills/fun-isometric/bin/fi.mjs sheet experiments/scifi/icons.ts rocket --cells 30
```

```bash
bun skills/fun-isometric/bin/fi.mjs export experiments/scifi/icons.ts ufo --px 400 --out experiments/scifi/previews
```

```bash
bun experiments/scifi/build-preview.mjs
```

## Keep it

Move the three icon definitions, with the `glow` helper they share, into `skills/fun-isometric/kit/icons.ts` and add them to `ICONS`. Two things follow from that, so decide them on purpose:

- `site/Page.tsx` maps over `ICONS`, so they appear in the public gallery.
- `SKILL.md` says "24 worked icons" and the rocket, robot and ufo make it 27. The worked icons table says every preset is covered, which stays true.

## Drop it

```bash
rm -rf experiments
```
