<script lang="ts" setup>
import { navOrientation, navOrigin } from './consts'

withDefaults(defineProps<{
  orientation?: string
  parent?: string
}>(), {
  orientation: navOrientation.HORIZONTAL,
  parent: navOrigin.HEADER,
})

const menuItems = [
  { label: 'Home', path: '' },
  { label: 'Blog', path: 'blog' },
  { label: 'Projects', path: 'portfolio' },
]

</script>

<template>
  <nav :aria-label="`${parent} navigation`" data-cy="main-navigation">
    <ul
      v-if="menuItems.length > 0"
      class="flex"
      :class="{
        'flex-col': orientation === navOrientation.VERTICAL,
      }"
    >
      <li
        v-for="link in menuItems"
        :key="link.label"
        class="font-bold mr-4 important-w-full"
      >
        <NuxtLink
          no-rel
          class="text-primary-400 dark:text-gray-50"
          :class="{
            'p-8 !w-full inline-flex  ': orientation === navOrientation.VERTICAL,
            'hover:text-bg-md px-1 ' : orientation === navOrientation.HORIZONTAL,
          }"
          :exact-active-class="orientation === navOrientation.HORIZONTAL ? 'text-bg-md' : ''"
          :to="`/${link.path}`"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
