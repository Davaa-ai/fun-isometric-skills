// Live preview entry: plays the sci-fi set beside three originals with the real kit player, the way a host page would.
import { PALETTES, clock, play } from './fun'
import type { Icon, Palette, Player } from './fun'
import { SCIFI } from './icons'
import { chat, headphones, trophy } from '../../skills/fun-isometric/kit/icons'

const players: Array<Player> = []
const root = document.getElementById('app') as HTMLElement
let palette: Partial<Palette> = PALETTES.riso

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]> = {}, ...kids: Array<Node | string>) => {
  const node = Object.assign(document.createElement(tag), props)
  node.append(...kids)
  return node
}

const section = (title: string, note: string, icons: ReadonlyArray<Icon>) => {
  const grid = el('div', { className: 'grid' })
  icons.forEach((icon, i) => {
    const canvas = el('canvas', { className: 'sticker' })
    canvas.setAttribute('aria-label', icon.name)
    grid.append(el('figure', {}, canvas, el('figcaption', {}, icon.name)))
    // staggered so the page does not enter in lockstep
    players.push(play(canvas, icon, { palette, enter: 0.1 + i * 0.12 }))
  })
  root.append(el('h2', {}, title), el('p', { className: 'note' }, note), grid)
}

const bar = el('div', { className: 'bar' })
const pick = (label: string, on: () => void, group: Array<HTMLButtonElement>) => {
  const b = el('button', { textContent: label, onclick: () => (group.forEach((x) => x.classList.remove('on')), b.classList.add('on'), on()) })
  group.push(b)
  bar.append(b)
  return b
}
const pals: Array<HTMLButtonElement> = []
for (const name of Object.keys(PALETTES) as Array<keyof typeof PALETTES>) {
  const b = pick(name, () => ((palette = PALETTES[name]), players.forEach((p) => p.set({ palette }))), pals)
  if (name === 'riso') b.classList.add('on')
}
bar.append(el('span', { className: 'gap' }))
const speeds: Array<HTMLButtonElement> = []
pick('1x', () => (clock.speed = 1), speeds).classList.add('on')
pick('0.25x', () => (clock.speed = 0.25), speeds)
pick('replay', () => players.forEach((p) => p.replay()), [])

root.append(bar)
section('sci-fi, new', 'rocket on bounce, robot on wobble and look, ufo on drift', SCIFI)
section('original set, for comparison', 'same canvas, same line, same palette slots', [chat, headphones, trophy])
