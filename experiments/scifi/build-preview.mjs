#!/usr/bin/env bun
// build-preview: bundles the kit and the icons into one self-contained preview.html that plays them live. Run: bun experiments/scifi/build-preview.mjs
import fs from 'node:fs'
import path from 'node:path'

const here = import.meta.dirname
const out = await Bun.build({ entrypoints: [path.join(here, 'preview.ts')], target: 'browser', format: 'esm', minify: true })
if (!out.success) (console.error(out.logs.map(String).join('\n')), process.exit(1))
const js = (await out.outputs[0].text()).replace(/<\/script/g, '<\\/script')

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>fun-isometric sci-fi experiment</title>
<style>
  :root { color-scheme: light; --ink: #111; --mute: #666; --line: #e4e4e4; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 32px 16px 64px; background: #fff; color: var(--ink); font: 15px/1.5 system-ui, sans-serif; }
  #app { max-width: 880px; margin: 0 auto; }
  h2 { margin: 36px 0 2px; font-size: 18px; }
  .note { margin: 0 0 12px; color: var(--mute); }
  .bar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 8px; }
  .bar .gap { flex: 1; }
  button { font: inherit; padding: 4px 12px; border: 1px solid var(--ink); border-radius: 999px; background: #fff; color: var(--ink); cursor: pointer; }
  button.on { background: var(--ink); color: #fff; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  figure { margin: 0; border: 1px solid var(--line); border-radius: 16px; padding: 12px; text-align: center; }
  .sticker { width: 100%; max-width: 260px; aspect-ratio: 1; }
  figcaption { color: var(--mute); font-size: 13px; }
</style>
</head>
<body>
<main id="app"><h1 style="margin:0;font-size:22px">fun-isometric, sci-fi experiment</h1></main>
<script type="module">${js}</script>
</body>
</html>
`
fs.writeFileSync(path.join(here, 'preview.html'), page)
console.log(`preview.html  ${(page.length / 1024).toFixed(0)} KB`)
