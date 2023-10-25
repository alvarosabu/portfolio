<script setup lang="ts">
defineProps<{
  hasFinishLoading: boolean, 
  progress: number
}>()
/* const { hasFinishLoading, progress, items } = await useProgress()
 */
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-white dark:bg-primary text-primary dark:text-light t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
</template>