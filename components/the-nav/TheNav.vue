<script lang="ts" setup>
import { navOrientation, navOrigin } from './consts'
import type { MenuItem } from './consts'

const props = withDefaults(defineProps<{
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

console.log('props', props.orientation)
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
        font-bold
        mr-4
        important-w-full
        text="primary-400 hover:bg-md dark:gray-50"
      >
        <nuxt-link
          no-rel
          :class="{
            'p-4 !w-full inline-flex': orientation === navOrientation.VERTICAL,
          }"
          :to="`/${link.path}`"
        >
          {{ link.label }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
