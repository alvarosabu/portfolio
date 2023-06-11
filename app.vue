<script lang="ts" setup>
const story = await useAsyncStoryblok(
  'home',
  { version: 'draft' },
)
</script>

<template>
  <div>
    <AsButton> Awiwi </AsButton>
    <pre>{{ story }}</pre>
  </div>
  <NuxtPage />
</template>
