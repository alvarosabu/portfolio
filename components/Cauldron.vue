<script setup lang="ts">
import { MeshPhongMaterial } from 'three'

const { nodes } = await useGLTF('/models/Cauldron.glb', { draco: true })
const store = useHomeStore()
const { scrollProgress } = storeToRefs(store)
const cauldron = nodes.Cauldron
const spoon = nodes.Spon
const potion = nodes.Potion
const potionCauldronRef = ref()

/* watch(scrollProgress, (value) => {
  if (value >= 0.5 && value < 0.9) {
    gsap.to(potionCauldronRef.value.scale, {
      delay: 1,
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out', // Easing function for smoother animation
    })
  }
  else {
    gsap.to(potionCauldronRef.value.scale, {
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
  }
}) */

watch(potionCauldronRef, (value) => {
/*   potionCauldronRef.value.scale.set(0, 0, 0)  */
  /* potionCauldronRef.value.scale.set(0, 0, 0) */
  potionCauldronRef.value.position.set(5, 2, 0)
  potionCauldronRef.value.rotation.set(0.1, -2.6, -0.6)
  /*  potion.rotation.set(0, +1, +0.6)
  spoon.rotation.set(0.5, -2.6, -0.6)
  cauldron.rotation.set(0.5, -2.6, -0.6) */
})

spoon.material.emissiveIntensity = 10

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  spoon.rotation.y += delta * 0.1
  spoon.position.y += Math.sin(delta) * 0.002
  potion.rotation.y -= delta * 0.01
  potion.material.emissiveIntensity = Math.sin(elapsed) * 1.5 + 3
})
</script>

<template>
  <Levioso>
    <TresGroup ref="potionCauldronRef">
      <primitive :object="cauldron" />
      <primitive :object="spoon" />
      <primitive :object="potion" />
    </TresGroup>
  </Levioso>
</template>