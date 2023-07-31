import { 
  theme, 
  shortcuts, 
  rules,
  fonts,
  typography, 
} from '@alvarosabu/ui'
import type {
  Preset } from 'unocss'
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme,
  shortcuts,
  rules,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts(fonts) as unknown as Preset,
    presetTypography(typography) as unknown as Preset,
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
