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
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: ['@alvarosabu/ui/styles', '~/styles/index.css', '@tresjs/leches/styles'],
  runtimeConfig: {
    public: {
      apiToken: process.env.STORYBLOK_API_TOKEN,
      youtubeKey: process.env.YOUTUBE_API_KEY,
      storyblokVersion: process.env.STORYBLOK_VERSION || 'published',
    },
  },
  build: {
    /*     transpile: ['@alvarosabu/storyblok-richtext-vue-renderer'], */
  },
  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_API_TOKEN,
      },
    ],
    '@unocss/nuxt',
    '@tresjs/nuxt',
    'nuxt-icon', 
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
    /*  optimizeDeps: { include: ['@alvarosabu/storyblok-richtext-vue-renderer'], exclude: ['fsevents'] }, */
    resolve: {
      dedupe: ['three'],
    },
  },
  tres: {
    devtools: true,
  },
  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com',
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