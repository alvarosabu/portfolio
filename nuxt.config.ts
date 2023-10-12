import SvgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@alvarosabu/ui/styles', '@tresjs/leches/styles'],

  modules: [
    '@unocss/nuxt',
    '@tresjs/nuxt',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_API_TOKEN,
        devtools: true,
      },
    ],
  ],
  devtools: { enabled: true },
  vite: {
    plugins: [SvgLoader()],
    optimizeDeps: { exclude: ['fsevents'] },
    resolve: {
      dedupe: ['three'],
    },
  },
})
