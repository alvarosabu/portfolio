<script setup lang="ts">
import { format } from 'date-fns'
import { StoryStatus } from '~/types'
import type { ArticleStory } from '~/types/articles'

useHead({
  title: 'Blog - AS Portfolio',
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
  title: 'Blog - AS Portfolio',
  description: 'A collection of articles about web development, design, 3D, and other topics.',
  ogDescription: 'A collection of articles about web development, design, 3D, and other topics.',
  ogUrl: 'https://alvarosaburido.dev/blog/',
  ogType: 'website',
  ogSiteName: 'AS Portfolio',
  ogTitle: 'Blog - AS Portfolio',
  ogImage: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1671031889/portfolio/og/og-blog_bnhvts.png',
  twitterDescription: 'A collection of articles about web development, design, 3D, and other topics.',
  twitterTitle: 'Blog - AS Portfolio',
  twitterImage: 'https://res.cloudinary.com/alvarosaburido/image/upload/v1671031889/portfolio/og/og-blog_bnhvts.png',
  twitterCard: 'summary_large_image',
})

const config = useRuntimeConfig()
const story = await useAsyncStoryblok(
  'blog',
  { version: config.public.storyblokVersion, resolve_relations: 'overview.featured_story' },
  { resolveRelations: 'overview.featured_story' },
)

// Fetching list of articles
const storyblokApi = useStoryblokApi()

const state = reactive({
  articles: [],
})

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

function onBeforeEnter(el) {
  el.style.opacity = 0
  el.style.height = 0
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}
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
        Blog
      </h1>
    </header>
    <TransitionGroup
      name="list"
      tag="section"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <article
        v-for="(article, index) in formattedArticles"
        :key="article.uuid"
        :data-index="index"
        class="bg-white dark:bg-primary rounded-lg shadow-lg"
      >
        <NuxtImg
          v-if="article.content.media"
          class="rounded-t-lg"
          :src="article.content.media.filename"
          :alt="article.content.media.alt"
          aspect-ratio="16/9"
        />
        <div class="px-4 prose pb-4">
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
    </TransitionGroup>
  </main>
</template>