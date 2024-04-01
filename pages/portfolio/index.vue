<script setup lang="ts">
import { SbRichText } from '@alvarosabu/storyblok-richtext-vue-renderer'

import { format } from 'date-fns'
import { StoryStatus } from '~/types'
import type { ProjectStory } from '~/types/projects'

useHead({
  title: 'Portfolio - AlvaroSabu',
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
  title: 'Portfolio - AlvaroSabu',
  description: 'A collection of projects I have worked on that can be shared.',
  ogDescription: 'A collection of projects I have worked on that can be shared.',
  ogUrl: 'https://alvarosaburido.dev/portfolio/',
  ogType: 'website',
  ogSiteName: 'AlvaroSabu',
  ogTitle: 'Portfolio - AlvaroSabu',
  ogImage: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1671031889/portfolio/og/og-blog_bnhvts.png',
  ogImageAlt: 'Portfolio - AlvaroSabu',
  twitterDescription: 'A collection of projects I have worked on that can be shared.',
  twitterTitle: 'Portfolio - AlvaroSabu',
  twitterImage: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1671031889/portfolio/og/og-blog_bnhvts.png',
  twitterImageAlt: 'Portfolio - AlvaroSabu',
  twitterCard: 'summary_large_image',
})

const config = useRuntimeConfig()
const story = await useAsyncStoryblok(
  'portfolio',
  { version: config.public.storyblokVersion, resolve_relations: 'overview.featured_story' },
  { resolveRelations: 'overview.featured_story' },
)

// Fetching list of articles
const storyblokApi = useStoryblokApi()

const { data: projects } = await storyblokApi.get('cdn/stories', {
  version: config.public.storyblokVersion as string,
  starts_with: 'portfolio',
  resolve_relations: 'category',
  is_startpage: false,
})

function formatProjectStory(story: ProjectStory): ProjectStory {
  if (story.published_at) {
    story.status = StoryStatus.PUBLISHED
    story.published_at = format(new Date(story.published_at), 'MMMM dd, yyyy')
  }
  else {
    story.status = StoryStatus.DRAFT
  }
  // TODO: add reading time
  /*  story.readingTime = `${Math.ceil(story.content.split(/\s/g).length / 200)} min read` */
  return story
}

const publishedProjects = computed(() =>
  projects.stories
    .map((story) => {
      story.content.category = projects.rels.find(({ uuid }) => story.content.category === uuid)
      return story
    })
    .map(formatProjectStory)
    .filter((project: ProjectStory) => project.status === StoryStatus.PUBLISHED),
)
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
    <header class="prose">
      <h1 class="headline-1 page-headline">
        Portfolio
      </h1>
    </header>
    <section
      v-if="publishedProjects.length > 0"
      class="relative z-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
    >
      <article
        v-for="(project, index) in publishedProjects"
        :key="project.uuid"
        :data-index="index"
        class="bg-white dark:bg-primary-600 rounded-lg shadow-lg"
      >
        <header class="relative">
          <NuxtImg
            v-if="project.content.media"
            class="rounded-t-lg border-b-1 border-gray-200 dark:border-primary-400 object-cover"
            :src="project.content.media.filename"
            :alt="project.content.media.alt"
            aspect-ratio="16/9"
            sizes="sm:100vw md:75vw lg:50vw xl:33vw"
            provider="storyblok"
            format="webp"
          />
          <AsBadge
            v-if="project.content.category"
            absolute
            right-4
            -bottom-5
            class="important-p-2 important-rounded-full bg-white dark:bg-primary-600 text-gray important-text-xl important-border-1 important-border-gray-200 dark:important-border-primary-400"
            :icon="project.content.category.content.icon"
            :title="project.content.category.content.name"
          />
        </header>
        <div class="px-4 prose pb-4">
          <h2 class="text-xl font-bold hover:text-secondary transition-all ease-in">
            <NuxtLink :to="`portfolio/${project.slug}`">
              {{ project.content.title }}
            </NuxtLink>
          </h2>
          <p class="text-primary-400 dark:text-primary-100 text-sm font-normal">
            {{ project.content.excerpt }}
          </p>
          <footer>
            <p class="text-xs font-mono font-semibold">
              {{ project.published_at }}
            </p>
          </footer>
        </div>
      </article>
    </section>
    <template v-else>
      <ErrorState :title="`${story?.content?.error_state[0].title} 🐛`">
        <SbRichText :doc="story?.content?.error_state[0].message.content" />
      </ErrorState>
    </template>
  </main>
</template>
