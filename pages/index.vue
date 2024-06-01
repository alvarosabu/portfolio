<script setup lang="ts">
import { NoToneMapping } from 'three'

useHead({
  title: 'AlvaroSabu | Creative Engineer & Front-end Developer',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})

useSeoMeta({
  title: 'AlvaroSabu | Creative Engineer',
  description: 'Welcome to my 3D planet. Alvaro Saburido personal portfolio',
  ogDescription: 'Welcome to my 3D planet. Alvaro Saburido personal portfolio',
  ogUrl: 'https://alvarosaburido.dev/',
  ogType: 'website',
  ogSiteName: 'AlvaroSabu',
  ogTitle: 'AlvaroSabu | Creative Engineer',
  ogImage: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1717241599/portfolio/og/v3/Open_Graph_-_Home_oxyn5k.png',
  ogImageAlt: 'AlvaroSabu | Creative Engineer',
  twitterDescription: 'Welcome to my 3D planet. Alvaro Saburido personal portfolio',
  twitterTitle: 'AlvaroSabu | Creative Engineer',
  twitterImage: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1717241599/portfolio/og/v3/Open_Graph_-_Home_oxyn5k.png',
  twitterImageAlt: 'AlvaroSabu | Creative Engineer',
  twitterCard: 'summary_large_image',
  keywords: 'portfolio, frontend, developer, web, nuxt, threejs, tres, vue, javascript, typescript, creative, engineer, alvaro, saburido',
})

const store = useHomeStore()
const { 
  hasFinishLoadingModels,
} = storeToRefs(store)


// Let the state know that the models are loaded
const { hasFinishLoading, progress } = await useProgress()

watch(hasFinishLoading, (value) => {
  if (value) {
    hasFinishLoadingModels.value = true
  }
})

</script>

<template>
    <TheLoader
    :progress="progress"
    :has-finish-loading="hasFinishLoading"
  />
  <main class="min-h-100vh pt-96px as-container">
    <TresCanvas window-size alpha shadows :tone-mapping="NoToneMapping">
      <UnderConstruction />
    </TresCanvas>
  </main>
</template>