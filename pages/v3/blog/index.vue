<script setup lang="ts">
useHead({
  title: 'Blog - AS Portfolio',
  meta: [
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Blog - AS Portfolio',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Blog - AS Portfolio',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1671031889/portfolio/og/og-blog_bnhvts.png',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1671031889/portfolio/og/og-blog_bnhvts.png',
    },
  ],
})

const config = useRuntimeConfig()
const story = await useAsyncStoryblok(
  'blog',
  { version: config.public.storyblokVersion, resolve_relations: 'overview.featured_story' },
  { resolveRelations: 'overview.featured_story' },
)
</script>

<template>
  <pre>{{ story }}</pre>
</template>