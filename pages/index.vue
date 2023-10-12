<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import gsap from 'gsap'

const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

function interpolate(start, end, progress) {
  const t = easeInOutQuad(progress) // Apply easing function
  return lerp(start, end, t)
}

const scrollProgress = ref(0)
const scRef = ref()

// Camera position
const cameraRef = ref()
const cameraInitialAnimationEnd = ref(false)
const cameraPosition = reactive(new Vector3(40, 0, 80))
const cameraPositionEnd = reactive(new Vector3(2, 0.5, 10))

const { hasFinishLoading, progress, items } = await useProgress()

watch(cameraRef, () => {
  if (cameraRef.value) {
    useControls('Camera', {
      position: cameraRef.value.position,
    })
  }
})

watch(hasFinishLoading, (value) => {
  if (value) {
    setTimeout(() => {
      gsap.to(cameraRef.value.position, {
        duration: 2, // Duration of the animation in seconds
        ...cameraPositionEnd,
        ease: 'power3.out', // Easing function for smoother animation
        onComplete: () => {
          cameraInitialAnimationEnd.value = true
        },
      })

    }, 1000)
  }
})

useControls('ScrollControls', {
  scrollProgress,
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
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-white t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
  <main class="relative">
    <TresLeches class="important-fixed important-z-100" />
    <section class="min-h-screen flex justify-end items-center">
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
            <h2
              v-show="cameraInitialAnimationEnd"
              class="text-4xl  font-extrabold"
            >
              Hi! 👋 I'm <span class="text-secondary">AlvaroSabu</span>
            </h2>
            <p>
              Creative Software Engineer from 🇻🇪 living in Barcelona, Spain.
            </p>
          </div>
        </Transition>
      </div>
    </section>
    <section class="min-h-screen container flex justify-end items-center">
      <div class="w-1/2 text-primary text-right">
        <h2 class="text-4xl font-extrabold mb-4">
          Launch your 3D Portfolio
        </h2>
        <p class="font-italic">
          And take it to the 🌕 🚀
        </p>
      </div>
    </section>
    <section class="min-h-screen container flex justify-end items-center">
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
      :cb="onScroll"
    >
      <Suspense>
        <ThePlanet :progress="scrollProgress" />
      </Suspense>
      <Suspense>
        <Shevas
          :greeting="cameraInitialAnimationEnd"
          :progress="scrollProgress"
        />
      </Suspense>
    </ScrollCtrls>
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