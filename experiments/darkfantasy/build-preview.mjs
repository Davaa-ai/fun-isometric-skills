#!/usr/bin/env bun
// build-preview: bundles the kit, palettes and icons into one self-contained preview.html that plays them live.
// Run: bun experiments/darkfantasy/build-preview.mjs
import fs from 'node:fs'
import path from 'node:path'

const here = import.meta.dirname
const out = await Bun.build({ entrypoints: [path.join(here, 'preview.ts')], target: 'browser', format: 'esm', minify: true })
if (!out.success) (console.error(out.logs.map(String).join('\n')), process.exit(1))
const js = (await out.outputs[0].text()).replace(/<\/script/g, '<\\/script')

const page = `<!doctype html>
<html lang="en" data-bg="night">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>fun-isometric dark fantasy experiment</title>
<style>
  :root { color-scheme: dark; --page: #120e19; --card: #1a1424; --line: #2c2140; --ink: #efe6fb; --mute: #9a8db0; }
  :root[data-bg='bone'] { color-scheme: light; --page: #efe8dc; --card: #f7f2ea; --line: #ddd2c0; --ink: #1b1424; --mute: #6d6178; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 32px 16px 64px; background: var(--page); color: var(--ink); font: 15px/1.5 system-ui, sans-serif; }
  #app { max-width: 920px; margin: 0 auto; }
  h1 { margin: 0 0 16px; font-size: 22px; }
  h2 { margin: 36px 0 2px; font-size: 18px; }
  .note { margin: 0 0 12px; color: var(--mute); }
  .bar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 8px; }
  .bar .gap { flex: 1; min-width: 8px; }
  button { font: inherit; padding: 4px 12px; border: 1px solid var(--ink); border-radius: 999px; background: transparent; color: var(--ink); cursor: pointer; }
  button.on { background: var(--ink); color: var(--page); }
  button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  figure { margin: 0; border: 1px solid var(--line); background: var(--card); border-radius: 16px; padding: 12px 12px 16px; text-align: center; }
  .sticker { width: 100%; max-width: 260px; aspect-ratio: 1; }
  figcaption { display: flex; flex-direction: column; gap: 2px; color: var(--mute); font-size: 13px; }
  figcaption strong { color: var(--ink); font-size: 15px; }
</style>
</head>
<body>
<main id="app"><h1>fun-isometric, dark fantasy experiment</h1></main>
<script type="module">${js}</script>
</body>
</html>
`
fs.writeFileSync(path.join(here, 'preview.html'), page)
console.log(`preview.html  ${(page.length / 1024).toFixed(0)} KB`)
