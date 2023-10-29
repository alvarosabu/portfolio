<script setup lang="ts">
import { Vector3 } from 'three'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const store = useHomeStore()
const {
  cameraInitialAnimationEnd,
  hasFinishLoadingModels,
  currentSection,
} = storeToRefs(store)
const breakpoints = useBreakpoints(breakpointsTailwind)

// Camera position
const cameraRef = ref()
/* breakpoints.greaterOrEqual('md').value 
    ? new Vector3(2, 0, 10) : new Vector3(2, 4, 20), */

const positions = [
  new Vector3(40, 0, 80),
  new Vector3(2, 0, 10),
  new Vector3(2, 3, 13),
  new Vector3(2, 2, 10),
]
// Camera init
watch(cameraRef, () => {
  if (cameraRef.value) {
    useControls('Camera', {
      position: cameraRef.value.position,
    })
  }
})

function toInitialCameraAnimation() {
  gsap.to(cameraRef.value.position, {
    delay: 1,
    duration: 1.2, // Duration of the animation in seconds
    ...positions[1],
    ease: 'power3.out', // Easing function for smoother animation
    onComplete: () => {
      cameraInitialAnimationEnd.value = true
    },
  })
}

// Camera animation after models are loaded
watch(hasFinishLoadingModels, (value) => {
  if (value) {
    toInitialCameraAnimation()
  }
})

// Camera animation on scroll
watch(currentSection, (value) => {
  switch (value) {
    case 1:
      gsap.to(cameraRef.value.position, {
        duration: 1.2, // Duration of the animation in seconds
        ...positions[1],
        ease: 'power3.out', // Easing function for smoother animation
        onUpdate: () => {
          cameraRef.value.lookAt(2, 0, 0)
        },
      })
      break
    case 2:
      gsap.to(cameraRef.value.position, {
        duration: 1.2, // Duration of the animation in seconds
        ...positions[2],
        ease: 'power3.out', // Easing function for smoother animation
        onUpdate: () => {
          cameraRef.value.lookAt(3, 3, 0)
        },
      })
      break
    case 3:
      gsap.to(cameraRef.value.position, {
        duration: 1.2, // Duration of the animation in seconds
        ...positions[3],
        ease: 'power3.out', // Easing function for smoother animation
        onUpdate: () => {
          cameraRef.value.lookAt(2, 0, 0)
        },
      })
      break
  
    default:
      break
  }

})
</script>

<template>
  <TresPerspectiveCamera
    ref="cameraRef"
    :position="positions[0]"
  />
</template>