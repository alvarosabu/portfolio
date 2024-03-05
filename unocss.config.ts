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
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: ['Inter', 'Inter:400,700'],
        mono: ['Fira Code', 'Fira Code:400,700' ],
        display: ['Inter'],
      },
    }) as unknown as Preset,
    presetTypography(typography) as unknown as Preset,
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
