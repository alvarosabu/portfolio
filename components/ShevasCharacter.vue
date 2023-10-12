<script setup lang="ts">
import { MeshPhongMaterial, DoubleSide, Vector3, Quaternion } from 'three'

const { scene, nodes, animations } = await useReactiveGLTF('/models/Shevas_v2.glb', { draco: true })

const { seekByName } = useSeek()

const character = computed(() => nodes.value['rig'])

const { changeEyes, changeAction } = useCharacterCtrl(character, animations)

const { value: eye } = useControls({
  controls: {
    label: 'Eye Selector',
    options: [
      { text: 'Eyes Open', value: 'open' },
      { text: 'Eyes Closed', value: 'closed' },
      { text: 'Eyes Wink', value: 'wink' },
    ],
    value: 'open',
  },
})

watch(eye, (value: string) => {
  changeEyes(value)
})

const { value: action } = useControls({
  actions: {
    label: 'Actions',
    options: [
      {
        text: 'Iddle',
        value: 'shevas_iddle',
      },
      {
        text: 'Walk',
        value: 'shevas_walk',
      },
      {
        text: 'Greetings',
        value: 'shevas_greeting',
      },
    ],
    value: 'shevas_iddle',
  },
})

watch(action, (value: string) => {
  changeAction(value)
})

/* 

watch(actionsCtrl.value, ({ value }) => {
  if (currentAction.value) {
    currentAction.value.fadeOut(0.2)
  }
  currentAction.value = actions[value]
  currentAction.value.reset()
  currentAction.value.fadeIn(0.2)
  currentAction.value.play()
}, {
  immediate: true,
}) */
/* watch(actionsCtrl.value, (value) => {
  console.log({ value })
}) */

/* currentAction.value.play() */

// Controls

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

const shirt = seekByName(character.value, 'ShevasCShirt')
const shorts = seekByName(character.value, 'ShevasCShorts')

shirt?.scale.set(1.5, 1.5, 1.5)
/* shirt.material = new MeshPhongMaterial({
  color: '#2B4052',
  side: DoubleSide,
}) */

shorts.material = new MeshPhongMaterial({
  color: '#978F6C',
  side: DoubleSide,
})
</script>

<template>
  <!--   <primitive :object="nodes['00ShevasEyesOpen']" /> -->
  <primitive :object="toRaw(character)" />
</template>