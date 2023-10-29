<script setup lang="ts">
const { nodes } = await useGLTF('/models/Mortar.glb', { draco: true })
const store = useHomeStore()
const { scrollProgress } = storeToRefs(store)

const mortarRef = ref()
const mortar = nodes.Mortar
const threejs = nodes.threejs
threejs.position.x = 0.3

watch(mortarRef, (value) => {
  mortarRef.value.scale.set(0, 0, 0)
  mortarRef.value.position.set(4, 3, 0)
  mortarRef.value.rotation.set(0, -0.5, 0)
})

watch(scrollProgress, (value) => {
  if (value >= 0.5 && value < 0.9) {
    gsap.to(mortarRef.value.scale, {
      delay: 1.5,
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out', // Easing function for smoother animation
    })
  }
  else {
    gsap.to(mortarRef.value.scale, {
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
  }
})

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.25 }) // Infinite loop with 1 second delay between repetitions
threejs.scale.set(0, 0, 0) // Set initial scale to 0
tl.to(threejs.scale, { x: 2, y: 2, z: 2, duration: 0.5, ease: 'power1.out' }) // Scale up
  .to(threejs.position, { y: '-=2', duration: 0.5, ease: 'power1.in' }, 0) // Fall down
  .to(threejs.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power1.in' }) // Scale down
</script>

<template>
  <Levioso>
    <TresGroup ref="mortarRef">
      <primitive :object="mortar" />
      <primitive :object="threejs" />
    </TresGroup>
  </Levioso>
</template>