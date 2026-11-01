// Live preview entry: plays the six archetypes with the real kit player, with three originals under them wearing the same palette.
import { RISO, clock, play } from './fun'
import type { Icon, Palette, Player } from './fun'
import { ARCHETYPES, ARCHETYPE_ICONS } from './icons'
import { DARK } from './palettes'
import { chat, headphones, trophy } from '../../skills/fun-isometric/kit/icons'

const LOOKS: Record<string, Partial<Palette>> = { ...DARK, riso: RISO }
const players: Array<Player> = []
const root = document.getElementById('app') as HTMLElement
let palette: Partial<Palette> = LOOKS.crypt

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]> = {}, ...kids: Array<Node | string>) => {
  const node = Object.assign(document.createElement(tag), props)
  node.append(...kids)
  return node
}

const section = (title: string, note: string, icons: ReadonlyArray<Icon>, label: (icon: Icon) => Array<Node | string>) => {
  const grid = el('div', { className: 'grid' })
  icons.forEach((icon, i) => {
    const canvas = el('canvas', { className: 'sticker' })
    canvas.setAttribute('aria-label', icon.name)
    grid.append(el('figure', {}, canvas, el('figcaption', {}, ...label(icon))))
    // staggered so the page does not enter in lockstep
    players.push(play(canvas, icon, { palette, enter: 0.1 + i * 0.1 }))
  })
  root.append(el('h2', {}, title), el('p', { className: 'note' }, note), grid)
}

const bar = el('div', { className: 'bar' })
const group = (items: ReadonlyArray<[string, () => void]>, first = 0) => {
  const buttons: Array<HTMLButtonElement> = []
  items.forEach(([name, on], i) => {
    const b = el('button', { textContent: name, onclick: () => (buttons.forEach((x) => x.classList.remove('on')), b.classList.add('on'), on()) })
    if (i === first) b.classList.add('on')
    buttons.push(b)
    bar.append(b)
  })
}
group(Object.keys(LOOKS).map((name): [string, () => void] => [name, () => ((palette = LOOKS[name]), players.forEach((p) => p.set({ palette })))]))
bar.append(el('span', { className: 'gap' }))
group([['night', () => (document.documentElement.dataset.bg = 'night')], ['bone', () => (document.documentElement.dataset.bg = 'bone')]])
group([['1x', () => (clock.speed = 1)], ['0.25x', () => (clock.speed = 0.25)]])
bar.append(el('button', { textContent: 'replay', onclick: () => players.forEach((p) => p.replay()) }))

root.append(bar)
section('love archetypes', 'six kinds of lover, each on a different kit preset', ARCHETYPE_ICONS, (icon) => {
  const a = ARCHETYPES[icon.name as keyof typeof ARCHETYPES]
  return [el('strong', {}, a.title), el('span', {}, a.line)]
})
section('original set, same slots', 'the kit as shipped, on whichever palette is picked above', [chat, headphones, trophy], (icon) => [icon.name])
