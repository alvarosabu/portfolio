import SvgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
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
    'nuxt-icon', [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_API_TOKEN,
        devtools: true,
      },
    ],
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/devtools',
  ],
  imports: {
    presets: [
      {
        from: 'gsap',
        imports: ['gsap'],
      },
    ],
  },
  vite: {
    plugins: [SvgLoader()],
    optimizeDeps: { exclude: ['fsevents'] },
    resolve: {
      dedupe: ['three'],
    },
  },
  tres: {
    devtools: true,
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