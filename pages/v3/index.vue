<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import gsap from 'gsap'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useHomeStore } from '~/stores/home'

const gl = {
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

definePageMeta({
  scrollToTop: true,
})

const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 0.5,
}) 

const story = await useAsyncStoryblok(
  'v3',
  { version: 'draft' },
)
const { hasFinishLoading, progress } = await useProgress()

/* console.log('story', story.value.content.body[0].content)
console.log('story', render(story.value.content.body[0].content.content)) */

useControls('fpsgraph')

const scRef = ref()
const sectionsRef = ref()
const store = useHomeStore()
const { 
  scrollProgress,
  cameraInitialAnimationEnd,
  hasFinishLoadingModels,
  sectionsNo,
  currentSection, 
} = storeToRefs(store)

watch(sectionsRef, (value) => {
  if (value) {
    sectionsNo.value = value.querySelectorAll('section').length
    useControls('Scroll', {
      scroll: scrollProgress,
      currentSection,
    })
  }

})

// Let the state know that the models are loaded
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
  <TresLeches class="important-fixed important-z-100" />
  <main
    ref="sectionsRef"
    class="relative text-primary dark:text-light"
  >
    <section class="min-h-screen snap-start flex justify-end items-start md:items-center pt-16">
      <div class="text-right mr-10%">
        <Transition
          name="fade"
          enter-active-class="animate-fade-in animate-duration-200 animate-count-1"
          leave-active-class="animate-fade-out animate-duration-200 animate-count-1"
        >
          <div
            v-show="cameraInitialAnimationEnd"
            class="prose "
          >
            <h2
              v-show="cameraInitialAnimationEnd"
              class="text-4xl  font-extrabold"
            >
              Hi! 👋 I'm <span class="text-secondary">AlvaroSabu</span>
            </h2>
            <p class="mb-16">
              Creative Software Engineer from 🇻🇪 living in Barcelona, Spain.
            </p>
            <footer class="flex justify-end">
              <AsButton variant="secondary">
                Say Hi!
              </AsButton>
            </footer>
          </div>
        </Transition>
      </div>
    </section>
    <section class="min-h-screen snap-start flex justify-start items-center bg-dark">
      <div class="prose text-light text-left ml-10% w-full w-1/4 pb-48">
        <Transition
          name="fade"
          enter-active-class="animate-fade-in animate-duration-200 animate-count-1"
          leave-active-class="animate-fade-out animate-duration-200 animate-count-1"
        >
          <div v-show="scrollProgress >= 0.5">
            <h2
              v-show="cameraInitialAnimationEnd"
              class="text-4xl  font-extrabold"
            >
              I love Open Source 💚
            </h2>
            <p class="mb-16 w-5/6">
              I work as <strong>DevRel</strong> at <a
                href="storyblok"
                target="_blank"
                class="text-secondary"
              >  <Icon name="logos:storyblok-icon" /> Storyblok</a> and I'm the author of <a
                href="https://tresjs.org"
                target="_blank"
                class="text-secondary"
              >TresJS</a> a vue custom renderer for <i>ThreeJS</i>.
            </p>
          </div>
        </Transition>
      </div>
    </section>
    <section class="min-h-screen snap-start container flex justify-end items-center">
      <div class="w-1/2 text-primary text-right">
        <h2 class="text-4xl font-extrabold mb-4">
          Launch your 3D Portfolio
        </h2>
        <p class="font-italic">
          And take it to the 🌕 🚀
        </p>
      </div>
    </section>
  </main>
  <TresCanvas
    v-bind="gl"
    window-size
    class="fixed top-0 left-0"
  >
    <CameraCtrl />
    <ScrollCtrls
      ref="scRef"
      v-model="scrollProgress"
      :distance="10"
      :smooth-scroll="0.1"
      html-scroll
      :cb="() => {}"
    >
      <PlanetSection />
      <TresGroup
        ref="potionsRef"
      >
        <Suspense>
          <PotionVue />
        </Suspense>
        <Suspense>
          <Cauldron />
        </Suspense>
        <Suspense>
          <Shevas />
        </Suspense>
        <Suspense>
          <Mortar />
        </Suspense>
      </TresGroup>
    </ScrollCtrls>
  
    <MouseParallax
      v-if="cameraInitialAnimationEnd"
      :factor="0.2"
      :ease="3"
    />
  
    <TresAmbientLight :intensity="2" />
    <TresPointLight
      color="#1BFFEF"
      :position="[0, 8, -16]"
      :intensity="8"
      cast-shadow
    />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>

<style>
html {
  scroll-snap-type: y mandatory;
}
</style>