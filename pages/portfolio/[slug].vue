<script setup lang="ts">
import { format } from 'date-fns'
import { AsCodeBlock } from '@alvarosabu/ui'
import { BlockTypes, ComponentTypes, SbRichText } from '@alvarosabu/storyblok-richtext-vue-renderer'

const resolvers = {
  [BlockTypes.CODE_BLOCK]: ({ children, attrs }) => {
    return h(
      AsCodeBlock,
      { code: children[0][0].children, language: attrs?.class?.split('-').pop() || '' },
      () => children,
    )
  },
}

const route = useRoute()
const config = useRuntimeConfig()
const storyapi = useStoryblokApi()
const story = ref(null)

const { data } = await storyapi.get('cdn/stories', {
  version: config.public.storyblokVersion,
  starts_with: 'portfolio',
  // Prepend */ to match with the first part of the full_slug
  by_slugs: `*/${route.params.slug}`,
  resolve_relations: 'category',
})

story.value = data.stories[0]
story.value.content.category = data.rels.find(({ uuid }) => story.value.content.category === uuid)
story.value.published_at = format(new Date(story.value.published_at), 'MMMM dd, yyyy')

// Metadata
useHead({
  title: `${story.value?.content?.title} - AlvaroSabu`,
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
  title: `${story?.value.content?.title} - AlvaroSabu`,
  keywords: story?.value.tag_list?.join(', '),
  description: story?.value.content.excerpt,
  ogDescription: story?.value.content.excerpt,
  ogUrl: `https://alvarosaburido.dev/portfolio/${route.params.slug}`,
  ogType: 'article',
  ogSiteName: 'AlvaroSabu',
  ogTitle: `${story?.value.content?.title} - AlvaroSabu`,
  ogImage: story?.value.content.media?.filename,
  ogImageAlt: story?.value.content.media?.alt,
  twitterDescription: story?.value.content.excerpt,
  twitterTitle: `${story?.value.content?.title} - AlvaroSabu`,
  twitterImage: story?.value.content.media?.filename,
  twitterImageAlt: story?.value.content.media?.alt,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main
    role="main"
    class="as-container page relative"
  >
    <AsGraphic
      class="fixed left-0 blur-md pointer-events-none"
      type="blob"
    />
    <AsGraphic
      class="fixed top-24 right-0 opacity-20 pointer-events-none"
      type="dots"
    />
    <header class="prose mx-auto border-b pb-8">
      <p class="my-12 lg:my-24">
        <NuxtLink to="/portfolio">
          <i class="i-carbon-chevron-left"></i> Back to portfolio
        </NuxtLink>
      </p>
      <NuxtImg
        class="w-full mb-8 rounded-lg object-cover"
        :src="story?.content?.media?.filename"
        :alt="story?.content?.media?.alt"
        sizes="sm:100vw md:75vw lg:600px"
        aspect-ratio="16/9"
        provider="storyblok"
        format="webp"
      />
      <h1 class="text-4xl font-bold">
        {{ story.content.title }} <AsBadge :icon="story?.content.category.content.icon" :label="story?.content.category.content.name" />
      </h1>
      <p class="text-xs font-mono font-semibold text-gray-400">
        {{ story.published_at }}
      </p>
    </header>
    <div class="prose mx-auto overflow-hidden pb-40">
      <SbRichText
        v-if="story.content.content"
        :doc="story.content.content"
        :resolvers="resolvers"
      />
    </div>
  </main>
</template>
