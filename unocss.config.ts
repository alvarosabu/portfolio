import { 
  theme, 
  shortcuts, 
  rules,
  fonts,
  icons,
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
  shortcuts: [
    ...shortcuts,
    {
      'as-container': 'lg:container mx-auto px-4 lg:px-0',
      page: 'min-h-100vh pt-48px text-primary dark:text-gray-200 font-sans',
      'page-headline': 'my-12 lg:my-24',
    },
  ],
  rules,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(icons),
    presetWebFonts(fonts),
    presetTypography(typography) as unknown as Preset,
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
