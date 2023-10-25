<script setup lang="ts">
const props = defineProps({ 
  blok: Object,
})
const content = computed(() => renderRichText(props.blok.content))

const cameraInitialAnimationEnd = useState('cameraInitialAnimationEnd')
</script>

<template>
  <section class="min-h-screen snap-start flex justify-end items-start md:items-center pt-16">
    <div class="text-right mr-10%">
      <Transition
        name="fade"
        enter-active-class="animate-fade-in animate-duration-200 animate-count-1"
        leave-active-class="animate-fade-out animate-duration-200 animate-count-1"
      >
        <div
          v-show="cameraInitialAnimationEnd"
          class="prose text-primary"
        >
          <div v-html="content" />
          <footer class="flex justify-end">
            <StoryblokComponent
              v-for="button in blok.actions"
              :key="button._uid"
              :blok="button"
            />
          </footer>
        </div>
      </Transition>
    </div>
  </section>
</template>