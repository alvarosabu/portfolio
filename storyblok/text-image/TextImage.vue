<script setup lang="ts">
import { SbRichText } from '@alvarosabu/storyblok-richtext-vue-renderer'

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
})

const media = computed(() => ({ ...props.blok.media, src: props.blok.media.filename }))
</script>

<template>
  <div class="break-out-prose">
    <AsTextImage :media="media" :direction="blok.direction">
      <SbRichText v-if="blok" :doc="blok.content" />
    </AsTextImage>
  </div>
</template>
