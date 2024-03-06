import type { Story, StoryAsset, StoryContent, StoryVersion } from './stories'

export interface ArticleStoryContent extends StoryContent {
  title: string
  media: StoryAsset
  excerpt: string
  featured: boolean
}
export interface ArticleStory extends Story {
  content: ArticleStoryContent
  status: StoryVersion
  readingTime: string
  publishedDateFormatted: string
  createdDateFormatted: string
}