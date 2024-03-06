<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  inverse: Boolean,
})

const name = ref('Alvaro')
const lastName = ref('Sabu')
</script>

<template>
  <NuxtLink
    to="/"
    inline-flex
    items-center
    font-extrabold
    uppercase
    font-display
    text-primary-400
    dark:text-gray-50
  >
    <img
      src="/avatar.png"
      width="32"
      height="32"
      alt="Alvaro Saburido avatar"
      w-9
      h-9
      mr-4
    >
    <span
      class="mr-1 sm:inline-block text-primary-400"
      :class="
        inverse
          ? 'text-gray-50 dark:text-primary-400'
          : 'text-primary-400 dark:text-gray-50'
      "
    >{{ `<${name}` }}</span>
    <span
      text-secondary-400
      hidden
      sm:inline-block
    >{{ lastName }}</span>
    <span
      hidden
      sm:inline-block
    >{{ '/>' }}</span>
    <span hidden> Go to home page</span>
  </NuxtLink>
</template>