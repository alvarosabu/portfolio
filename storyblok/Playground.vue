<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <iframe :src="blok.url.url" class="w-full min-h-550px rounded"></iframe>
</template>
