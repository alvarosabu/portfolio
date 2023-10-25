import SvgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@alvarosabu/ui/styles', '@tresjs/leches/styles'],
  runtimeConfig: {
    public: {
      apiToken: process.env.STORYBLOK_API_TOKEN,
      youtubeKey: process.env.YOUTUBE_API_KEY,
      storyblokVersion: process.env.STORYBLOK_VERSION || 'published',
    },
  },
  modules: [
    '@unocss/nuxt',
    '@tresjs/nuxt',
    'nuxt-icon',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_API_TOKEN,
        devtools: true,
      },
    ],
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  vite: {
    plugins: [SvgLoader()],
    optimizeDeps: { exclude: ['fsevents'] },
    resolve: {
      dedupe: ['three'],
    },
  },
  nuxtIcon: {
    size: '24px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      nuxt: 'logos:nuxt-icon',
      storyblok: 'logos:storyblok-icon',
    },
  },
})
