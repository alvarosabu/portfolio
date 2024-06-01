<script setup lang="ts">
const store = useHomeStore()
const { 
  currentSection,
  hasFinishLoadingModels,
} = storeToRefs(store)

const planetRef = ref()

const { invalidate } = useTres()

watch(planetRef, (value) => {
  if (value) {
    planetRef.value.scale.set(0, 0, 0)
    invalidate()
  }
})


watch(hasFinishLoadingModels, (value) => {
  if (value && planetRef.value) {
    gsap.to(planetRef.value.scale, {
      delay: 0.75,
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out', // Easing function for smoother animation
      onUpdate: () => {
        invalidate()
      },
    })
  }
})

watch(currentSection, (value) => {
  if (value) {
    switch (value) {
      case 1:
        gsap.to(planetRef.value.scale, {
          duration: 1, // Duration of the animation in seconds
          x: 1,
          y: 1,
          z: 1,
          ease: 'elastic.out', // Easing function for smoother animation
        })
        break
      case 2:
        gsap.to(planetRef.value.scale, {
          duration: 0.2, // Duration of the animation in seconds
          x: 0,
          y: 0,
          z: 0,
          ease: 'power4.out', // Easing function for smoother animation
        })
      default:
        gsap.to(planetRef.value.scale, {
          duration: 0.2, // Duration of the animation in seconds
          x: 0,
          y: 0,
          z: 0,
          ease: 'power4.out', // Easing function for smoother animation
        })
        break
    }
  }
})
</script>

<template>
  <TresGroup
    ref="planetRef"
  >
    <Suspense>
      <ThePlanet />
    </Suspense>
  </TresGroup>
</template>