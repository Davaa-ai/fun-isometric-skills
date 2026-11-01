// Sci-fi experiment: three stickers drawn and rigged by the fun-isometric rules, on the kit's own presets.
// Nothing here edits the kit. To keep them, append these icons to skills/fun-isometric/kit/icons.ts; to drop them, delete experiments/.
import { VIEWS, ellipse, onFace, pill, poly, rect, spark, star } from './fun'
import { bounce, drift, flick, flicker, look, slide, sparkle, twinkle, wobble } from '../../skills/fun-isometric/kit/motions'
import type { Icon, Layer, Motion, Shape, Vec } from './fun'

const LINE = 5
// the house view: faces turned in their plane and leaned back, sides falling down left
const { tilt: FACE, extrude: EXT } = VIEWS.right

// a white sparkle riding a parent, popped by whatever motion it is given
const glow = (parent: string, p: Vec, r: number, m: Motion | ReadonlyArray<Motion>, extra: { ip?: number; op?: number } = {}): Layer => ({
  parent,
  a: p,
  p,
  m,
  ...extra,
  shapes: [{ d: spark(p[0], p[1], r), fill: 'white' }],
})

// Rocket
// An upright object: one silhouette on one leaned plane. The plane is spun 33 degrees so the nose points up and right, which is the
// direction `bounce` already travels, so the lift off rides the rocket's own axis and the preset is only scaled with k.
const AIM: Vec = [28, 36]
const NOZZLE: Vec = [0, 106]
// the tip is a hair blunt: a sharp one makes the outline's miter shoot out past it
const TIP = 'M-8 -152Q0 -162 8 -152C22 -134 50 -108 50 -58'
const BODY = `${TIP}L50 80Q50 94 36 94L-36 94Q-50 94 -50 80L-50 -58C-50 -108 -22 -134 -8 -152Z`
const CONE = `${TIP}L-50 -58C-50 -108 -22 -134 -8 -152Z`
const fin = (s: number) => poly([[s * 46, 0], [s * 98, 98], [s * 98, 128], [s * 46, 84]], [3, 7, 7, 3])

// every flame shares one command list so they morph point for point; lean swings the tip, len stretches it
const jet = (lean: number, len: number, k = 1, dy = 0) =>
  `M${-34 * k} ${dy}C${-46 * k} ${dy + len * 0.34} ${(-16 + lean) * k} ${dy + len * 0.7} ${lean * 1.5 * k} ${dy + len}` +
  `C${(16 + lean) * k} ${dy + len * 0.7} ${46 * k} ${dy + len * 0.34} ${34 * k} ${dy}Z`
const burn = (k: number, dy: number, len: number) =>
  flicker([jet(0, len, k, dy), jet(-10, len * 1.12, k, dy), jet(9, len * 0.92, k, dy), jet(-10, len * 1.12, k, dy)], 45)

export const rocket: Icon = {
  name: 'rocket',
  frames: 180,
  // hovering, flame lit
  still: 44,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'ship', p: [268, 262], m: { ...bounce, k: 2.4 }, shapes: [] },
    // the flame lights on lift off and cuts as it comes down, growing out of the nozzle
    {
      parent: 'ship',
      tilt: AIM,
      a: NOZZLE,
      p: onFace(AIM, NOZZLE),
      m: [twinkle(0), twinkle(96, true)],
      shapes: [
        { d: burn(1, 102, 150), fill: 'hot', depth: 0.7 },
        { d: burn(0.55, 104, 100), fill: 'gold', depth: 0.3 },
      ],
    },
    {
      id: 'hull',
      parent: 'ship',
      tilt: AIM,
      shapes: [
        { d: fin(-1), fill: 'main', depth: 0.6 },
        { d: fin(1), fill: 'main', depth: 0.6 },
        { d: poly([[-30, 92], [30, 92], [24, 120], [-24, 120]], 4), fill: 'deep', depth: 0.8 },
        { d: BODY, fill: 'white', depth: 1 },
        { d: rect(-50, 40, 100, 18), fill: 'main' },
        { d: CONE, fill: 'main', depth: 1 },
        { d: ellipse(0, -14, 32), fill: 'grey', depth: 0.4 },
        { d: ellipse(0, -14, 21), fill: 'deep' },
        { d: ellipse(-7, -21, 5.5, 8), fill: 'white', line: false },
      ],
    },
    // stars pop on the lift off and again on the touchdown
    glow('ship', [116, -118], 28, [twinkle(8), twinkle(100, true)]),
    glow('ship', [-148, -64], 17, [twinkle(16), twinkle(108, true)]),
    glow('ship', [150, 22], 15, [twinkle(100), twinkle(150, true)]),
  ],
}

// Robot
// A face, so it is a sibling of `chat`: the whole head rocks on `wobble`, the pupils glance on `look` inside clipped eyes,
// and the antenna is its own part that flicks late, so something always lags.
const ROCK = onFace(FACE, [0, 98])

export const robot: Icon = {
  name: 'robot',
  frames: 180,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'bot', a: ROCK, p: [250 + ROCK[0], 300 + ROCK[1]], m: wobble, shapes: [] },
    {
      id: 'head',
      parent: 'bot',
      tilt: FACE,
      shapes: [
        ...[-1, 1].map((s): Shape => ({ d: rect(s * 134 - 15, -20, 30, 80, 10), fill: 'deep', depth: 0.7 })),
        { d: rect(-122, -84, 244, 184, 40), fill: 'main', depth: 1 },
        { d: rect(-98, -58, 196, 126, 28), fill: 'deep' },
        { d: pill(-28, 36, 56, 16), fill: 'gold' },
      ],
    },
    {
      parent: 'head',
      a: [0, -84],
      p: [0, -84],
      m: { ...flick, k: 1.6 },
      shapes: [{ d: rect(-7, -146, 14, 66), fill: 'grey', depth: 0.5 }, { d: ellipse(0, -156, 22), fill: 'hot', depth: 0.6 }],
    },
    { id: 'eyeL', parent: 'head', shapes: [{ d: ellipse(-44, -12, 26, 30), fill: 'white' }] },
    { id: 'eyeR', parent: 'head', shapes: [{ d: ellipse(44, -12, 26, 30), fill: 'white' }] },
    { parent: 'head', clip: 'eyeL', m: { ...look, k: 1.6 }, shapes: [{ d: ellipse(-38, -6, 15), fill: 'ink', line: false }] },
    { parent: 'head', clip: 'eyeR', m: { ...look, k: 1.6 }, shapes: [{ d: ellipse(50, -6, 15), fill: 'ink', line: false }] },
    glow('bot', [158, -118], 26, sparkle(16)),
    glow('bot', [-164, -70], 16, sparkle(92)),
  ],
}

// UFO
// Round bodies are drawn foreshortened, like the coins. It hovers on `drift`, the preset for things that fly; the lights run on
// `twinkle` like the battery cells; the beam grows from its tip and the star rides it up on `slide`, tucked under the hull.
const LIGHT = (i: number): Vec => [[-101, 18], [-58, 31], [0, 36], [58, 31], [101, 18]][i] as Vec
const DOME = 'M-64 -10C-64 -96 64 -96 64 -10A64 20 0 0 1 -64 -10Z'
const BEAM = 'M-52 70L-106 192A106 24 0 0 0 106 192L52 70Z'
const APEX: Vec = [0, 70]
// slanted almond eyes, so the alien is looking at you
const EYE = (s: number) => `M${s * 22} -46Q${s * 8} -47 ${s * 4} -29Q${s * 18} -28 ${s * 22} -46Z`

export const ufo: Icon = {
  name: 'ufo',
  frames: 180,
  // beam lit, the star on its way up
  still: 36,
  line: LINE,
  extrude: EXT,
  layers: [
    { id: 'ufo', p: [250, 190], m: drift, shapes: [] },
    { parent: 'ufo', a: APEX, p: APEX, m: [twinkle(18), twinkle(112, true)], shapes: [{ d: BEAM, fill: 'tint' }] },
    // the cargo pops in as the beam lights, is lifted into the hull, set back down, and pops out once the beam is gone
    { parent: 'ufo', a: [0, 150], p: [0, 150], m: [slide([0, -96], 28, 30, 40), twinkle(14), twinkle(138, true)], shapes: [{ d: star(0, 150, 30, 0.46, 5, 4), fill: 'gold', depth: 0.6 }] },
    {
      parent: 'ufo',
      shapes: [
        { d: ellipse(0, 30, 106, 40), fill: 'deep', depth: 1.4 },
        { d: ellipse(0, 0, 150, 46), fill: 'grey', depth: 1 },
        { d: DOME, fill: 'white', depth: 0.4 },
        { d: ellipse(0, -34, 29, 30), fill: 'ok' },
        { d: EYE(-1), fill: 'ink', line: false },
        { d: EYE(1), fill: 'ink', line: false },
      ],
    },
    ...[0, 1, 2, 3, 4].map(
      (i): Layer => ({
        parent: 'ufo',
        a: LIGHT(i),
        p: LIGHT(i),
        m: [twinkle(10 + i * 8), twinkle(118 + i * 6, true)],
        shapes: [{ d: ellipse(LIGHT(i)[0], LIGHT(i)[1], 12, 9), fill: i === 2 ? 'hot' : 'gold' }],
      }),
    ),
    glow('ufo', [150, -92], 26, sparkle(62)),
    glow('ufo', [-146, -70], 16, sparkle(92)),
  ],
}

export const SCIFI: ReadonlyArray<Icon> = [rocket, robot, ufo]
