<script setup lang="ts">
// Load potions scene 
const { nodes } = await useGLTF('/models/Potions-class.glb', { draco: true })

// Cauldron
const cauldron = nodes.Cauldron
const spoon = nodes.Spon
const potion = nodes.Potion

// Potion Vue
const bottle = nodes.Bottle
const cork = nodes.Cork
const drop = nodes.Drop
const liquid = nodes.Liquid

// Mortar
const mortar = nodes.Mortar
const threejs = nodes.threejs

// Misc
const stool = nodes.Stool
const book = nodes.Book
const book2 = nodes.Book001

// Tres 
const tres = nodes.Tres

const all = [cauldron, spoon, potion, bottle, cork, drop, liquid, mortar, threejs, stool, book, book2, tres]

const store = useHomeStore()
const { currentSection } = storeToRefs(store)
/* const currentSection = ref(1) */
useControls({
  currentSection,
})
const potionsClassRef = ref()

// Init all to scale 0
watch(potionsClassRef, (value) => {
  all.forEach((item) => {
    item.scale.set(0, 0, 0)
  })

})

function init() {
  return gsap.timeline().to([cauldron.scale, spoon.scale, potion.scale], {
    delay: 0.5,
    duration: 1, // Duration of the animation in seconds
    x: 1,
    y: 1,
    z: 1,
    ease: 'elastic.out', // Easing function for smoother animation
  }).to([bottle.scale, liquid.scale, cork.scale], {

    duration: 1, // Duration of the animation in seconds
    x: 1,
    y: 1,
    z: 1,
    ease: 'elastic.out', // Easing function for smoother animation
  }).to([mortar.scale], {
    duration: 0.5, // Duration of the animation in seconds
    x: 1,
    y: 1,
    z: 1,
    ease: 'elastic.out', // Easing function for smoother animation
  })
}

function dropAnimation() {
  // Infinite loop with 1 second delay between repetitions
  return gsap.timeline({ repeat: 1, repeatDelay: 1 })
    .to(drop.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.5, ease: 'power1.out' }) // Scale up
    .to(drop.position, { y: '-=2.5', duration: 0.5, ease: 'power1.in' }, 0) // Fall down
    .to(drop.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power1.in' }) // Scale down
   
}

function mortarAnimation() {
  return gsap.timeline({ repeat: 2, repeatDelay: 0.25 })
    .to(threejs.scale, { x: 2, y: 2, z: 2, duration: 0.5, ease: 'power1.out' }) // Scale up
    .to(threejs.position, { y: '-=2', duration: 0.5, ease: 'power1.in' }, 0) // Fall down
    .to(threejs.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power1.in' }) // Scale down
}

function tresAnimation() {
  return gsap.timeline()
    .to(tres.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.5, ease: 'power4.out' }) // Scale up
    .to(tres.rotation, { y: `-=${4 * Math.PI}`, duration: 0.5, ease: 'power4.in' }, 0) // Fall down
    .to(tres.position, { y: '+=2', duration: 0.5, ease: 'power4.in' }, 0) // Appear up
}

function endBottleAndMortar() {
  return gsap.timeline()
    .to([mortar.scale], {
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
    .to([bottle.scale, liquid.scale, cork.scale], {
      delay: 1,
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
}
function end() {
  return gsap.timeline()
    .to(tres.scale, { delay: 2, x: 0, y: 0, z: 0, duration: 0.5, ease: 'power4.out' }) // Scale down
    .to([cauldron.scale, spoon.scale, potion.scale], {
      delay: 0.5,
      duration: 0.2, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
}

function resetAnimations() {
  if (masterTL) {
    masterTL.kill()
    masterTL = null
  }
  gsap.to([
    all.map(item => item.scale),
  ], {
    duration: 0.2, // Duration of the animation in seconds
    x: 0,
    y: 0,
    z: 0,
    ease: 'power4.out', // Easing function for smoother animation
  })
}
let masterTL

watch(currentSection, (value) => {
  if (value) {
    switch (value) {
      case 1:
        resetAnimations()
        break
      case 2:
        // Potion Vue
        masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 }) // Infinite loop with 1 second delay between repetitions

        masterTL
          .add(init())
          .add(dropAnimation())
          .add(mortarAnimation())
          .add(endBottleAndMortar())
          .add(tresAnimation())
          .add(end())
        break
      case 3:
        resetAnimations()
        break
    }
  }
})
</script>

<template>
  <TresGroup
    ref="potionsClassRef"
  >
    <Levioso>
      <primitive :object="cauldron" />
      <primitive :object="spoon" />
      <primitive :object="potion" />
    </Levioso>
    <Levioso>
      <primitive :object="bottle" />
      <primitive :object="liquid" />
      <primitive :object="drop" />
    </Levioso>
    <Levioso>
      <primitive :object="cork" />
    </Levioso>
    <Levioso>
      <primitive :object="mortar" />
      <primitive :object="threejs" />
    </Levioso>
    <Levioso>
      <primitive :object="stool" />
      <primitive :object="book" />
    </Levioso>
    <Levioso>
      <primitive :object="book2" />
    </Levioso>

    <primitive :object="tres" />
  </TresGroup>
</template>