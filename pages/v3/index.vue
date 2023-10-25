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
  if (value < 0.2) {
    if (planetRef.value.scale.x === 0) {
      planetRef.value.visible = true
      gsap.to(planetRef.value.scale, {
        duration: 1, // Duration of the animation in seconds
        x: 1,
        y: 1,
        z: 1,
        ease: 'elastic', // Easing function for smoother animation
      })
    }
  }
  if (value >= 0.2) {
    gsap.to(planetRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'elastic', // Easing function for smoother animation
    })
  }
})

// PlanetRef

const planetRef = ref()

watch(hasFinishLoading, (value) => {
  if (value) {
    setTimeout(() => {
      const initTimeline = gsap.timeline()
      initTimeline.to(planetRef.value.scale, {
        duration: 1, // Duration of the animation in seconds
        x: 1,
        y: 1,
        z: 1,
        ease: 'elastic', // Easing function for smoother animation
      })
      initTimeline.to(cameraRef.value.position, {
        duration: 1.2, // Duration of the animation in seconds
        ...cameraPositionEnd,
        ease: 'power3.out', // Easing function for smoother animation
        onComplete: () => {
          cameraInitialAnimationEnd.value = true
        },
      })
    }, 1000)
  }
})

/* 
  beginning camera position = [40, 0, 80]
  ending camera position = [2, 0, 10]
*/

/* onLoop(() => {
  if (cameraRef.value) {
    cameraRef.value.position.x = - progress.value * 40 + 40
    cameraRef.value.position.z = - progress.value * 100 + 80
  }
}) */

/* watch(progress, (value) => {
  if (value < 0.37) {
    cameraRef.value.position.x = interpolate(cameraPosition.x, cameraPositionEnd.x, value * 2.5)
     cameraRef.value.position.y = interpolate(cameraPosition.y, cameraPositionEnd.y, value)
    cameraRef.value.position.z = interpolate(cameraPosition.z, cameraPositionEnd.z, value * 2.5)
  }
  
}) */

watch(scrollProgress, (value) => {
  /* if (value < 0.37) {
    cameraRef.value.position.x = interpolate(cameraPosition.x, cameraPositionEnd.x, value * 2.5)
    cameraRef.value.position.y = interpolate(cameraPosition.y, cameraPositionEnd.y, value)
    cameraRef.value.position.z = interpolate(cameraPosition.z, cameraPositionEnd.z, value * 2.5)
  } */
})

function onScroll(delta) {
  /* if(cameraRef.value) {
    cameraRef.value.position.y = interpolate(cameraPosition.y, cameraPositionEnd.y, - delta * 2.5)
  } */
}
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
    <section class="min-h-screen snap-start flex justify-end items-center bg-dark">
      <div class="prose text-light text-right mr-10% w-full w-1/4">
        <h2
          v-show="cameraInitialAnimationEnd"
          class="text-4xl  font-extrabold"
        >
          I love Open Source 💚
        </h2>
        <p class="mb-16">
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
    <ScrollControls
      ref="scRef"
      v-model="scrollProgress"
      :distance="10"
      :smooth-scroll="0.1"
      html-scroll
    >
      <Suspense>
        <Shevas />
      </Suspense>
    </ScrollControls>
    <TresGroup
      ref="planetRef"
      :scale="[0, 0, 0]"
    >
      <Suspense>
        <ThePlanet :progress="scrollProgress" />
      </Suspense>
    </TresGroup>
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