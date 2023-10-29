<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import gsap from 'gsap'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useHomeStore } from '~/stores/home'

const breakpoints = useBreakpoints(breakpointsTailwind)

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

const store = useHomeStore()
const { scrollProgress, cameraInitialAnimationEnd } = storeToRefs(store)

// Camera position
const cameraRef = ref()
const cameraPosition = reactive(new Vector3(40, 0, 80))
const cameraPositionEnd = breakpoints.greaterOrEqual('md').value 
  ? reactive( new Vector3(2, 0, 10)) : reactive(new Vector3(2, 4, 20))

watch(cameraRef, () => {
  if (cameraRef.value) {
    useControls('Camera', {
      position: cameraRef.value.position,
    })
  }
})

watch(scrollProgress, (value) => {
  if (value < 0.1) {
    gsap.to(planetRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out', // Easing function for smoother animation
    })
    gsap.to(cameraRef.value.position, {
      duration: 1.2, // Duration of the animation in seconds
      ...cameraPositionEnd,
      ease: 'power3.out', // Easing function for smoother animation
      onUpdate: () => {
        cameraRef.value.lookAt(2, 0, 0)
      },
    })
  }
  if (value >= 0.1) {
    gsap.to(planetRef.value.scale, {
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
    gsap.to(cameraRef.value.position, {
      duration: 1.2, // Duration of the animation in seconds
      y: cameraPositionEnd.y + 3,
      z: cameraPositionEnd.z + 3,
      ease: 'power3.out', // Easing function for smoother animation
      onUpdate: () => {
        cameraRef.value.lookAt(3, 3, 0)
      },
    })
  }
})

// PlanetRef

const planetRef = ref()

watch(hasFinishLoading, (value) => {
  if (value) {
    setTimeout(() => {
      
      gsap.to(planetRef.value.scale, {
        duration: 1, // Duration of the animation in seconds
        x: 1,
        y: 1,
        z: 1,
        ease: 'elastic', // Easing function for smoother animation
      })
      gsap.to(cameraRef.value.position, {
        duration: 1.2, // Duration of the animation in seconds
        ...cameraPositionEnd,
        ease: 'power3.out', // Easing function for smoother animation
        onUpdate: () => {
          cameraRef.value.lookAt(2, 0, 0)
        },
        onComplete: () => {
          cameraInitialAnimationEnd.value = true
        },
      })
    }, 1000)
  }
})

watch(scrollProgress, (value) => {
  /* if (value >= 0.5) {
    gsap.to(cameraRef.value.position, {
      duration: 1.2, // Duration of the animation in seconds
      y: cameraRef.value.position.y - 0.5,
      ease: 'power3.out', // Easing function for smoother animation
      onUpdate: () => {
        cameraRef.value.lookAt(0, cameraRef.value.position.y - 0.5, 0)
      },
    })
  } */
})
</script>

<template>
  <TheLoader
    :progress="progress"
    :has-finish-loading="hasFinishLoading"
  />
  <main
    class="relative text-primary dark:text-light"
  >
    <TresLeches class="important-fixed important-z-100" />
 
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
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="cameraPosition"
    />
    <ScrollCtrls
      ref="scRef"
      v-model="scrollProgress"
      :distance="10"
      :smooth-scroll="0.1"
      html-scroll
      :cb="() => {}"
    >
      <TresGroup
        ref="planetRef"
        :scale="[0, 0, 0]"
      >
        <Suspense>
          <ThePlanet />
        </Suspense>
      </TresGroup>
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