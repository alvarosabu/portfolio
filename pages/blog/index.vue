<script setup lang="ts">
import { format } from 'date-fns'

import { StoryStatus } from '~/types'
import type { ArticleStory } from '~/types/articles'

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

// Fetching list of articles
const storyblokApi = useStoryblokApi()
const { data: articles } = await storyblokApi.get('cdn/stories', {
  version: 'draft',
  starts_with: 'blog',
  is_startpage: false,
})

function formatArticleStory(story: ArticleStory): ArticleStory {
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

const formattedArticles = computed(() => 
  articles.stories
    .map(formatArticleStory)
    .filter((article: ArticleStory) => article.status === StoryStatus.PUBLISHED),
)
</script>

<template>
  <main
    role="main"
    class="as-container page"
  >
    <header class="prose">
      <h1 class="headline-1 page-headline">
        Blog
      </h1>
    </header>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
      <article
        v-for="article in formattedArticles"
        :key="article.uuid"
        class="bg-white dark:bg-primary rounded-lg shadow-lg"
      >
        <NuxtImg
          v-if="article.content.media"
          class="rounded-t-lg"
          :src="article.content.media.filename"
          :alt="article.content.media.alt"
          aspect-ratio="16/9"
        />
        <div class="px-4 prose">
          <h2 class="text-xl font-bold hover:text-secondary transition-all ease-in">
            <NuxtLink :to="article.full_slug">
              {{ article.content.title }}
            </NuxtLink>
          </h2>
          <p class="text-primary-400 dark:text-primary-100 text-sm font-normal">
            {{ article.content.excerpt }}
          </p>
          <footer>
            <p class="text-xs font-mono font-semibold">
              {{ article.published_at }}
            </p>
          </footer>
        </div>
      </article>
    </section>
  </main>
</template>