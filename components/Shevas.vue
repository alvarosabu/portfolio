<script setup lang="ts">
import { DoubleSide, MeshPhongMaterial } from 'three'
import gsap from 'gsap'
import { useScrollLock } from '@vueuse/core'

const { scene, nodes, animations } = await useReactiveGLTF('/models/Shevas-v3.glb', { draco: true })

const store = useHomeStore()
const { scrollProgress, cameraInitialAnimationEnd } = storeToRefs(store)
const { seekByName } = useSeek()

const character = computed(() => nodes.value['rig'])
const characterRef = ref()
const { changeEyes, changeAction, greet } = useCharacterCtrl(character, animations)

const unwatchGretting = watch(cameraInitialAnimationEnd, (value) => {
  if (value) {
    greet()

    unwatchGretting()
  }
})
/* const isLocked = useScrollLock(window)
isLocked.value = true */

watch(scrollProgress, (value) => {
  if (value < 0.15) {
    /* if (characterRef.value.scale.x === 0) { */
    characterRef.value.visible = true
    gsap.to(characterRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic', // Easing function for smoother animation
    })
    setOutfit('casual')
    changeAction('shevas_greeting')
    /*  } */
    
  }
  if (value >= 0.15 && value < 0.5) {
    gsap.to(characterRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'elastic', // Easing function for smoother animation
    })
    /* characterRef.value.position.y = -80 */
  }
  if (value >= 0.480) {
    /*  if (characterRef.value.scale.x === 0) { */
    characterRef.value.visible = true
    gsap.to(characterRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic', // Easing function for smoother animation
    })
    setOutfit('slytherin')
    changeAction('shevas_spellcast')
    /*  } */

  }
})

// Materials
const body = seekByName(character.value, 'ShevasBody') as TresObject
const tongue = seekByName(character.value, 'CubeBody002') as TresObject
const head = seekByName(character.value, 'CubeBody002_1') as TresObject
const hair = seekByName(character.value, 'ShevasHair') as TresObject
const hairBack = seekByName(character.value, 'CubeBody002_2') as TresObject
const teeth = seekByName(character.value, 'CubeBody002_3') as TresObject

const skinMaterial = new MeshPhongMaterial({
  color: '#C2A498',
})

head.material = skinMaterial

body.material = skinMaterial

tongue.material = new MeshPhongMaterial({
  color: '#C23431',
})

const hairMaterial = new MeshPhongMaterial({
  color: '#7F6758',
})

hair.material = hairMaterial
hairBack.material = hairMaterial
teeth.material = new MeshPhongMaterial({
  color: '#F2F2F2',
})

// Clothes
// Clothes

const { setOutfit } = useClothes(character)

setOutfit('casual')
</script>

<template>
  <TresGroup
    ref="characterRef"
  >
    <primitive :object="toRaw(character)" />
  </TresGroup>
</template>