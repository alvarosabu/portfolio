import type { Story, StoryAsset, StoryContent, StoryVersion } from './stories'

export interface ProjectStoryContent extends StoryContent {
  title: string
  media: StoryAsset
  excerpt: string
  featured: boolean
}
export interface ProjectStory extends Story {
  content: ProjectStoryContent
  status: StoryVersion
  readingTime: string
  publishedDateFormatted: string
  createdDateFormatted: string
}