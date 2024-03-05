<script setup lang="ts">
import { MeshPhongMaterial } from 'three'
import gsap from 'gsap'

const { scene, nodes, animations } = await useReactiveGLTF('/models/Shevas-v4.glb', { draco: true })

const store = useHomeStore()
const { scrollProgress, cameraInitialAnimationEnd, currentSection } = storeToRefs(store)
const { seekByName } = useSeek()

const character = computed(() => nodes.value['rig'])
const characterRef = ref()
const showCharacter = ref(false)

const { openEyes,
  closeEyes,
  changeAction,
  greet,
  followMouse, 
} = useCharacterCtrl(character, animations)

const unwatchGretting = watch(cameraInitialAnimationEnd, (value) => {
  if (value) {
    greet()

    unwatchGretting()
  }
})

watch(scrollProgress, (value) => {
  if (value < 0.1) {
    showCharacter.value = true

    setOutfit('casual')
    changeAction('shevas_greeting')
    followMouse.value = false
  }
  if (value >= 0.1 && value < 0.5) {
    showCharacter.value = false
  }
  if (value >= 0.480 && value < 0.6) {
    showCharacter.value = true
  
    setOutfit('slytherin')
    changeAction('shevas_spellcast')
    closeEyes()
    followMouse.value = false
  }
  if (value >= 0.6 && value < 0.9) {
    showCharacter.value = true

    setOutfit('casual')
    changeAction('shevas_iddle_action')
    openEyes()
    followMouse.value = true
  }
})

watch(showCharacter, (value) => {
  if (value) {
    gsap.to(characterRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out', // Easing function for smoother animation
    })
  }
  else {
    gsap.to(characterRef.value.scale, {
      duration: 1, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.out', // Easing function for smoother animation
    })
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