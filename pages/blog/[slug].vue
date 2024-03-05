<script setup lang="ts">
import { SbRichText } from '@alvarosabu/storyblok-richtext-vue-renderer'

const route = useRoute()
const config = useRuntimeConfig()
const story = await useAsyncStoryblok(
  route.path,
  { 
    version: config.public.storyblokVersion,
  },
)
console.log(story)
</script>

<template>
  <main
    role="main"
    class="mx-auto prose dark:prose-invert py-20 text-primary dark:text-light"
  > 
    <header>
      <p>
        <NuxtLink to="-1">
          <i class="i-carbon-chevron-left" /> All articles
        </NuxtLink>
      </p>
      <NuxtImg 
        class="w-full mb-8 rounded-lg"
        :src="story?.content.media?.filename"
        :alt="story?.content.media?.alt"
        aspect-ratio="16/9"
      />
      <h1 class="text-4xl font-bold">
        {{ story.content.title }}
      </h1>
      <p class="text-gray-500">
        {{ story.content.intro }}
      </p>
    </header>
    <SbRichText :doc="story.content.content" />
  </main>
</template>