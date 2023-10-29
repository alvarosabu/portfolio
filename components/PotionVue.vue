<script setup lang="ts">
const { nodes } = await useGLTF('/models/potion-vue.glb', { draco: true })
const store = useHomeStore()
const { scrollProgress } = storeToRefs(store)

const potionVueRef = ref()
const bottle = nodes.Bottle
const cork = nodes.Cork
const drop = nodes.Drop
const liquid = nodes.Liquid

watch(potionVueRef, (value) => {
  potionVueRef.value.scale.set(0, 0, 0)
  potionVueRef.value.position.set(5, 3, 1)
})

watch(scrollProgress, (value) => {
  if (value >= 0.5 && value < 0.9) {
    gsap.to(potionVueRef.value.scale, {
      delay: 1.5,
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out', // Easing function for smoother animation
    })
  }
  else {
    gsap.to(potionVueRef.value.scale, {
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
  }
})

const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 }) // Infinite loop with 1 second delay between repetitions
drop.scale.set(0, 0, 0) // Set initial scale to 0
tl.to(drop.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.5, ease: 'power1.out' }) // Scale up
  .to(drop.position, { y: '-=2.5', duration: 0.5, ease: 'power1.in' }, 0) // Fall down
  .to(drop.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power1.in' }) // Scale down
</script>

<template>
  <TresGroup ref="potionVueRef">
    <Levioso>
      <primitive :object="bottle" />
      <primitive :object="liquid" />
    </Levioso>
    <Levioso>
      <primitive :object="cork" />
    </Levioso>
    <primitive :object="drop" />
  </TresGroup>
</template>