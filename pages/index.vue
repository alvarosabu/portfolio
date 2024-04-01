<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'

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
  <div>
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
        <div class="prose text-light text-left ml-10% w-full sm:w-1/4 pb-48">
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
                  href="https://www.storyblok.com/"
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
      <section class="min-h-screen snap-start container"></section>
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
        <Suspense>
          <Shevas />
        </Suspense>
        <Suspense v-if="currentSection > 0 ">
          <PotionsClassSection />
        </Suspense>
        <CardSection v-if="currentSection > 1 " />
      </ScrollCtrls>
      <!--     <OrbitControls /> -->
      <MouseParallax
        v-if="cameraInitialAnimationEnd"
        :factor="0.2"
        :ease="3"
      />

      <TresAmbientLight :intensity="2" />

      <ContactShadows
        v-if="currentSection > 1"
        :blur="3.5"
        :width="3"
        :height="3"
        :opacity="0.8"
      />
      <TresDirectionalLight
        :position="[0, 2, 4]"
        :intensity="1"
        cast-shadow
      />
    </TresCanvas>
  </div>
</template>

<style>
html {
  scroll-snap-type: y mandatory;
}
.wrapper {
  position: fixed !important;
}
</style>
