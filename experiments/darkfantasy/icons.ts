// Dark fantasy love archetypes: six stickers drawn and rigged by the fun-isometric rules, each one a kind of lover.
// Same slabs, same outline, same palette slots, same presets as the kit. The darkness lives in palettes/, not in the drawing,
// so every one of these also plays in riso. Nothing here edits the kit. Keep: append to skills/fun-isometric/kit/icons.ts. Drop: rm -rf experiments.
import { VIEWS, ellipse, line, onFace, pill, poly, rect, ring, rosette, spark } from './fun'
import { clasp, fall, flicker, float, glint, hop, impact, latch, nudge, shackle, toss, tossLag2, twinkle } from '../../skills/fun-isometric/kit/motions'
import type { Icon, Layer, Motion, Shape, Vec } from './fun'

const LINE = 5
// the house view: faces turned in their plane and leaned back, sides falling down left
const { tilt: FACE, extrude: EXT } = VIEWS.right

// what each sticker says about the person, so the set defines a niche and not just a pile of objects
export const ARCHETYPES = {
  lockheart: { title: 'The Guarded', line: 'Loves you fully. Through a locked door, with a lawyer present.' },
  dagger: { title: 'The Reckless', line: 'Would rather bleed than be bored.' },
  potion: { title: 'The Intoxicated', line: 'Mistakes the fix for the feeling.' },
  rose: { title: 'The Tragic Romantic', line: 'Falls for the ending before the first date.' },
  orb: { title: 'The Fated', line: 'It was written. Also, they did check your birth chart.' },
  candle: { title: 'The Devoted', line: 'Burns down quietly so you stay warm.' },
} as const

// a white sparkle riding a parent, popped by whatever motion it is given
const glow = (parent: string | undefined, p: Vec, r: number, m: Motion | ReadonlyArray<Motion>, extra: { ip?: number; op?: number } = {}): Layer => ({
  parent,
  a: p,
  p,
  m,
  ...extra,
  shapes: [{ d: spark(p[0], p[1], r), fill: 'white' }],
})

const PAIR = /(-?\d+\.?\d*) (-?\d+\.?\d*)/g
// grows or shrinks a path of plain x y pairs about a point, for rims and insets
const inset = (d: string, k: number, [cx, cy]: Vec) => d.replace(PAIR, (_, x: string, y: string) => `${+(cx + (+x - cx) * k).toFixed(2)} ${+(cy + (+y - cy) * k).toFixed(2)}`)
// scales a path about the origin, then moves it
const put = (d: string, k: number, [tx, ty]: Vec) => d.replace(PAIR, (_, x: string, y: string) => `${+(+x * k + tx).toFixed(2)} ${+(+y * k + ty).toFixed(2)}`)

const HEART = 'M0 92C-24 74 -132 8 -132 -48C-132 -94 -98 -122 -62 -122C-34 -122 -12 -106 0 -84C12 -106 34 -122 62 -122C98 -122 132 -94 132 -48C132 8 24 74 0 92Z'
// a small heart centred on a point, for vapours, labels and things inside glass
const heartAt = (cx: number, cy: number, k: number) => put(HEART, k, [cx, cy + 15 * k])
const HEART_TILT: Vec = [-14, 30]

// Guarded
// A brass love lock clamped on a heart. The lock is the kit's `clasp` + `shackle` pair; the heart takes the slam on `nudge`.
const SHACKLE = 'M-30 -4L-30 -50A30 30 0 0 1 30 -50L30 -4L17 -4L17 -50A17 17 0 0 0 -17 -50L-17 -4Z'
const LOCK_KEY = ellipse(0, 12, 9) + poly([[-4, 16], [4, 16], [7, 38], [-7, 38]], 2)

export const lockheart: Icon = {
  name: 'lockheart',
  frames: 180,
  still: 126,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'heart', p: [250, 252], m: { ...nudge, at: 62 }, shapes: [] },
    { parent: 'heart', tilt: HEART_TILT, shapes: [{ d: HEART, fill: 'hot', depth: 1, edges: [[0, 92]] }, { d: inset(HEART, 0.7, [0, -22]) }] },
    { id: 'lock', parent: 'heart', p: [16, 40], m: { ...clasp, k: 0.8 }, shapes: [] },
    { parent: 'lockbody', a: [-23, -30], p: [-23, -30], m: { ...shackle, k: 0.7 }, shapes: [{ d: SHACKLE, fill: 'grey', depth: 0.7 }] },
    { id: 'lockbody', parent: 'lock', tilt: FACE, shapes: [{ d: rect(-44, -14, 88, 74, 12), fill: 'gold', depth: 1 }, { d: LOCK_KEY, fill: 'ink', line: false }] },
    // the slam lands on frame 85
    glow('heart', [-156, -78], 28, [twinkle(86), twinkle(150, true)]),
    glow('heart', [150, 70], 17, [twinkle(94), twinkle(150, true)]),
  ],
}

// Reckless
// The blade is two layers of one shape: whole behind the heart, so the tip comes out the far side, and again in front clipped to the
// wound line, so it sinks into the heart as it slams. The wound line rides the heart, which takes the hit on `impact`.
const BLADE = poly([[-19, -84], [19, -84], [19, 98], [0, 150], [-19, 98]], 2)
const AXIS: Vec = [-0.375, 0.927]
const SLAM = 24
const SCALE = 1.1
const ENTRY: Vec = [262, 226]
const DRIP = 'M0 -22C10 -6 16 4 16 14A16 16 0 0 1 -16 14C-16 4 -10 -6 0 -22Z'
const TIP: Vec = [ENTRY[0] + AXIS[0] * (150 * SCALE + SLAM), ENTRY[1] + AXIS[1] * (150 * SCALE + SLAM)]

export const dagger: Icon = {
  name: 'dagger',
  frames: 180,
  still: 104,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'stab', p: ENTRY, r: 22, s: [SCALE * 100, SCALE * 100], m: latch([AXIS[0] * SLAM, AXIS[1] * SLAM]), shapes: [] },
    { parent: 'stab', shapes: [{ d: BLADE, fill: 'white', depth: 0.5 }] },
    { id: 'beat', p: [ENTRY[0] - 12, ENTRY[1] + 12], m: impact([-5, 11]), shapes: [] },
    { parent: 'beat', tilt: HEART_TILT, shapes: [{ d: HEART, fill: 'hot', depth: 1, edges: [[0, 92]] }, { d: inset(HEART, 0.7, [0, -22]) }] },
    // a window above the wound line that clips the blade, invisible: no fill and no outline
    { id: 'above', parent: 'beat', p: [12, -12], r: 22, shapes: [{ d: rect(-260, -520, 520, 520), line: false }] },
    { parent: 'above', shapes: [{ d: ellipse(0, 0, 30, 11), fill: 'ink', line: false }] },
    { parent: 'stab', clip: 'above', shapes: [{ d: BLADE, fill: 'white', depth: 0.5 }] },
    {
      parent: 'stab',
      shapes: [
        { d: rect(-54, -100, 108, 22, 8), fill: 'gold', depth: 0.8 },
        { d: rect(-13, -136, 26, 40, 6), fill: 'deep', depth: 0.8 },
        { d: ellipse(0, -146, 19, 17), fill: 'gold', depth: 0.8 },
      ],
    },
    // two drops form on the tip, let go and are cut
    { p: [TIP[0] - 2, TIP[1] + 16], m: [twinkle(34), fall([0, 38], 50)], op: 79, shapes: [{ d: DRIP, fill: 'hot', depth: 0.4 }] },
    { p: [TIP[0] - 2, TIP[1] + 16], m: [twinkle(58), fall([0, 38], 74)], ip: 58, op: 103, shapes: [{ d: DRIP, fill: 'hot', depth: 0.4 }] },
    glow('stab', [64, -64], 24, glint(30, 100)),
    glow('beat', [-148, -112], 20, [twinkle(44), twinkle(150, true)]),
  ],
}

// Intoxicated
// A flask tossed: `toss` on the body and `tossLag2` on the liquid, clipped to the glass, so the potion slops the way the kit's folder does.
const FLASK = 'M-26 -132L-26 -78C-104 -52 -124 22 -96 82C-80 116 -48 128 0 128C48 128 80 116 96 82C124 22 104 -52 26 -78L26 -132Z'
const SLOSH: Vec = [0, 40]

export const potion: Icon = {
  name: 'potion',
  frames: 180,
  still: 110,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'bottle', a: [0, 120], p: [248, 380], m: toss, shapes: [] },
    { id: 'glass', parent: 'bottle', tilt: FACE, shapes: [{ d: FLASK, fill: 'tint', depth: 1 }] },
    { parent: 'bottle', clip: 'glass', tilt: FACE, a: SLOSH, p: onFace(FACE, SLOSH), m: tossLag2, shapes: [{ d: rect(-170, -4, 340, 190), fill: 'hot' }] },
    { parent: 'bottle', tilt: FACE, shapes: [{ d: heartAt(0, 66, 0.3), fill: 'white', line: 3 }, { d: poly([[-86, 4], [-72, -6], [-62, 40], [-76, 50]], 4), fill: 'white', line: false }] },
    {
      parent: 'bottle',
      tilt: FACE,
      shapes: [{ d: rect(-24, -176, 48, 44, 8), fill: 'gold', depth: 0.8 }, { d: rect(-36, -138, 72, 18, 6), fill: 'deep', depth: 0.8 }],
    },
    // vapour hearts rise out of the neck as it lands
    { parent: 'bottle', a: [20, -184], p: [20, -184], m: [twinkle(44), twinkle(120, true)], shapes: [{ d: heartAt(20, -184, 0.16), fill: 'hot', depth: 0.3 }] },
    { parent: 'bottle', a: [-30, -208], p: [-30, -208], m: [twinkle(58), twinkle(126, true)], shapes: [{ d: heartAt(-30, -208, 0.11), fill: 'hot', depth: 0.3 }] },
    glow('bottle', [150, -110], 26, [twinkle(40), twinkle(150, true)]),
  ],
}

// Tragic Romantic
// A nightshade rose, one silhouette on one leaned plane like the trophy: scalloped petals in rings, built with the kit's rosette().
// It hops on the beat; a petal lets go and a fresh one grows back before the loop comes round.
const HEAD: Vec = [0, -104]
// a small spiral of ink, wound outward, for the heart of the bloom
const swirl = (cx: number, cy: number, r: number) =>
  line(...Array.from({ length: 30 }, (_, i): Vec => [cx + r * (0.2 + (0.8 * i) / 29) * Math.cos(i * 0.36), cy + r * (0.2 + (0.8 * i) / 29) * Math.sin(i * 0.36)]))
const flipX = (d: string) => d.replace(PAIR, (_, x: string, y: string) => `${-+x} ${y}`)
const LEAF = 'M6 74C-24 46 -76 56 -96 18C-48 8 -14 32 6 58Z'
const PETAL = 'M0 -26C24 -16 26 14 0 30C-26 14 -24 -16 0 -26Z'
const PETAL_AT: Vec = [98, -100]
// the layer sits on the bloom's leaned plane, so its pivot is a face point and its place is that point seen leaned
const petal = (extra: { ip?: number; op?: number }, m: Motion | ReadonlyArray<Motion>): Layer => ({
  parent: 'rose',
  tilt: FACE,
  a: PETAL_AT,
  p: onFace(FACE, PETAL_AT),
  m,
  ...extra,
  shapes: [{ d: put(PETAL, 1, PETAL_AT), fill: 'main', depth: 0.4 }],
})

export const rose: Icon = {
  name: 'rose',
  frames: 180,
  still: 60,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'rose', a: [0, 150], p: [250, 392], m: hop, shapes: [] },
    {
      parent: 'rose',
      tilt: FACE,
      shapes: [
        { d: rect(-9, -40, 18, 192, 9), fill: 'ok', depth: 0.6 },
        { d: LEAF, fill: 'ok', depth: 0.5 },
        { d: put(flipX(LEAF), 1, [0, -40]), fill: 'ok', depth: 0.5 },
        { d: poly([[9, 24], [36, 38], [9, 54]], 2), fill: 'ok', depth: 0.4 },
        { d: rosette(HEAD[0], HEAD[1], 88, 7, 0.66), fill: 'main', depth: 1 },
        { d: rosette(HEAD[0], HEAD[1], 58, 6, 0.7), fill: 'deep', depth: 0.3 },
        { d: rosette(HEAD[0], HEAD[1], 30, 5, 0.75), fill: 'main' },
        { d: swirl(HEAD[0], HEAD[1], 15), round: true },
      ],
    },
    petal({ op: 128 }, fall([22, 150], 96, 32)),
    petal({ ip: 146 }, twinkle(146)),
    glow(undefined, [112, 84], 26, [twinkle(8), twinkle(150, true)]),
    glow(undefined, [398, 74], 17, [twinkle(18), twinkle(150, true)]),
  ],
}

// Fated
// A crystal ball. The ball floats, the heart inside hops on the kit's `hop`, and the stars wink, all clipped to the glass.
const BALL: Vec = [0, -18]
const RIM = `${ellipse(0, 84, 100, 28)}M-68 84A68 15 0 1 0 68 84A68 15 0 1 0 -68 84Z`

export const orb: Icon = {
  name: 'orb',
  frames: 180,
  still: 60,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'seer', p: [250, 252], m: float, shapes: [] },
    { parent: 'seer', shapes: [{ d: ellipse(0, 122, 108, 33), fill: 'deep', depth: 1.2 }] },
    { id: 'ball', parent: 'seer', shapes: [{ d: ellipse(BALL[0], BALL[1], 106), fill: 'deep', depth: 0.6 }] },
    { parent: 'seer', clip: 'ball', a: [0, -4], p: [0, -4], m: { ...hop, k: 0.7 }, shapes: [{ d: heartAt(0, -4, 0.3), fill: 'hot', depth: 0.3 }] },
    ...([[-60, -2, 15, 30], [58, -58, 17, 50], [54, 26, 14, 74], [-34, 40, 12, 88]] as const).map(
      ([x, y, r, at]): Layer => ({ parent: 'seer', clip: 'ball', a: [x, y], p: [x, y], m: [twinkle(at), twinkle(at + 60, true)], shapes: [{ d: spark(x, y, r), fill: 'gold' }] }),
    ),
    { parent: 'seer', shapes: [{ d: RIM, fill: 'gold', depth: 0.9 }] },
    { parent: 'seer', a: [-50, -70], p: [-50, -70], m: glint(10, 100), shapes: [{ d: 'M-77.1 -46A82 82 0 0 1 -28 -95.1L-22.6 -80A66 66 0 0 0 -62 -40.6Z', fill: 'white', line: false }] },
    glow('seer', [138, -112], 26, [twinkle(26), twinkle(150, true)]),
    glow('seer', [-146, 40], 16, [twinkle(48), twinkle(150, true)]),
  ],
}

// Devoted
// A candle on a chamberstick. The flame is the kit's `flicker`; a wax drop forms at the rim and falls to the dish while hearts lift off.
const WICK: Vec = [0, -124]
// every flame shares one command list so they morph point for point; drawn with its base on the wick
const flame = (lean: number, len: number, k: number) => {
  const [x, y] = [(v: number) => +(WICK[0] + v * k).toFixed(2), (v: number) => +(WICK[1] + v).toFixed(2)]
  return (
    `M${x(-26)} ${y(0)}C${x(-38)} ${y(-len * 0.3)} ${x(-10 + lean)} ${y(-len * 0.62)} ${x(lean * 1.4)} ${y(-len)}` +
    `C${x(10 + lean)} ${y(-len * 0.62)} ${x(38)} ${y(-len * 0.3)} ${x(26)} ${y(0)}A${+(26 * k).toFixed(2)} ${+(20 * k).toFixed(2)} 0 0 1 ${x(-26)} ${y(0)}Z`
  )
}
const burn = (k: number, len: number) => flicker([flame(0, len, k), flame(-9, len * 1.12, k), flame(8, len * 0.9, k), flame(-9, len * 1.12, k)], 45)
// a tall object on the house plane reads as toppling, so the candle's spin is eased and the lean kept
const STAND: Vec = [-7, 36]
const WAX = 'M0 -20C9 -6 13 2 13 10A13 13 0 0 1 -13 10C-13 2 -9 -6 0 -20Z'

export const candle: Icon = {
  name: 'candle',
  frames: 180,
  still: 60,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'candle', p: [244, 348], shapes: [] },
    {
      parent: 'candle',
      tilt: STAND,
      shapes: [
        { d: ring(106, 104, 26, 12), fill: 'gold', depth: 0.6 },
        { d: rect(-92, 90, 184, 32, 16), fill: 'gold', depth: 1 },
        { d: poly([[-42, -104], [42, -104], [42, 92], [-42, 92]], [20, 20, 0, 0]), fill: 'tint', depth: 1 },
        { d: pill(22, -112, 20, 84), fill: 'tint', depth: 0.3 },
        { d: line([0, -102], [0, -126]), line: 6 },
      ],
    },
    { parent: 'candle', tilt: STAND, a: WICK, p: onFace(STAND, WICK), shapes: [{ d: burn(1.25, 104), fill: 'hot', depth: 0.6 }, { d: burn(0.72, 66), fill: 'gold', depth: 0.25 }] },
    // a drop forms at the rim, falls to the dish and is cut
    { parent: 'candle', tilt: STAND, a: [-30, -92], p: onFace(STAND, [-30, -92]), m: [twinkle(10), fall([0, 170], 40, 30)], op: 72, shapes: [{ d: put(WAX, 1, [-30, -92]), fill: 'white', depth: 0.4 }] },
    // the hearts lift off the flame
    { parent: 'candle', a: [92, -252], p: [92, -252], m: [twinkle(52), twinkle(130, true)], shapes: [{ d: heartAt(92, -252, 0.2), fill: 'hot', depth: 0.3 }] },
    { parent: 'candle', a: [128, -292], p: [128, -292], m: [twinkle(70), twinkle(140, true)], shapes: [{ d: heartAt(128, -292, 0.13), fill: 'hot', depth: 0.3 }] },
    glow('candle', [-118, -190], 22, [twinkle(48), twinkle(150, true)]),
  ],
}

export const ARCHETYPE_ICONS: ReadonlyArray<Icon> = [lockheart, dagger, potion, rose, orb, candle]
