// Dark fantasy palettes as partial sets over the kit's RISO, so each icon keeps its slot roles and only the colours go dark.
// The JSON files are the single source: fi reads them with --palette <file>, the preview imports them here.
import crypt from './palettes/crypt.json'
import blood from './palettes/blood.json'
import venom from './palettes/venom.json'
import type { Palette } from './fun'

export const DARK = { crypt, blood, venom } satisfies Record<string, Partial<Palette>>
export type DarkName = keyof typeof DARK
