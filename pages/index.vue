<script setup lang="ts">
import { NoToneMapping } from 'three'

const store = useHomeStore()
const { 
  hasFinishLoadingModels,
} = storeToRefs(store)


// Let the state know that the models are loaded
const { hasFinishLoading, progress } = await useProgress()

watch(hasFinishLoading, (value) => {
  if (value) {
    hasFinishLoadingModels.value = true
  }
})
</script>

<template>
    <TheLoader
    :progress="progress"
    :has-finish-loading="hasFinishLoading"
  />
  <main class="min-h-100vh pt-96px as-container">
    <TresCanvas window-size alpha shadows :tone-mapping="NoToneMapping">
      <UnderConstruction />
    </TresCanvas>
  </main>
</template>