<script setup lang="ts">
import { MeshToonMaterial, DoubleSide } from 'three'

const { scene, nodes, animations } = await useGLTF('/models/shevas.glb')
const { seekByName } = useSeek()

const character = nodes['rig']

character.traverse((child) => {
  if (child.name === '01ShevasEyesClosed' || child.name === '02ShevasEyesClosedLeft') {
    child.visible = false
  }
})

const eyeSelectorBone = seekByName(character, 'eyeselector')
console.log({
  nodes,
  character,
  animations,
  eyeSelectorBone: eyeSelectorBone?.position,
})

// Animations 

const { actions, mixer } = useAnimations(animations, character)

const currentAction = actions['shevas_iddle']

currentAction.play()

const body = seekByName(character, 'CubeBody002_1')
const insideMouth = seekByName(character, 'CubeBody002_2')
const hair = seekByName(character, 'CubeBody002_3')
const teeth = seekByName(character, 'CubeBody002_4')
const tongue = seekByName(character, 'CubeBody002')

body.material = new MeshToonMaterial({
  color: '#C2A498',
})

hair.material = new MeshToonMaterial({
  /* color: '#462A1D', */
  color: '#7F6758',
})

insideMouth.material = new MeshToonMaterial({
  color: '#383434',
})

teeth.material = new MeshToonMaterial({
  color: '#F2F2F2',
})

tongue.material = new MeshToonMaterial({
  color: '#C23431',
})

// Clothes

const shirt = seekByName(character, 'ShevasCShirt')
const shorts = seekByName(character, 'ShevasCShorts')

shirt.material = new MeshToonMaterial({
  color: '#2B4052',
  side: DoubleSide,
})

shorts.material = new MeshToonMaterial({
  color: '#978F6C',
  side: DoubleSide,
})
</script>

<template>
  <!--   <primitive :object="nodes['00ShevasEyesOpen']" /> -->
  <primitive :object="character" />
</template>