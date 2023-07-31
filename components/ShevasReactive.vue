<script setup lang="ts">
import { MeshToonMaterial, DoubleSide } from 'three'

const { scene, nodes, animations } = await useReactiveGLTF('/models/shevas.glb')

const { seekByName } = useSeek()

const character = computed(() => nodes.value['rig'])

const eyeSelectorBone = computed(() => nodes.value['eyeselector'])

const eyeSelectorBoneRef = ref(null)

character.value.traverse((child) => {
  if (child.name === '01ShevasEyesClosed' || child.name === '02ShevasEyesClosedLeft') {
    child.visible = false
  }
})
const eyes = {
  open: seekByName(character.value, '00ShevasEyesOpen'),
  closed: seekByName(character.value, '01ShevasEyesClosed'),
  wink: seekByName(character.value, '02ShevasEyesClosedLeft'),
}

useControls('fpsgraph')

const eyeCtrl = useControls({
  label: 'Eye Selector',
  options: [
    { text: 'Eyes Open', value: 'open' },
    { text: 'Eyes Closed', value: 'closed' },
    { text: 'Eyes Wink', value: 'wink' },
  ],
  value: 'open',
})

watch(eyeCtrl.value, ({ value }) => {
  Object.values(eyes).forEach((eye) => {
    if (!eye) return
    eye.visible = false
  })
  eyes[value].visible = true
})

// Animations 

const { actions, mixer } = useAnimations(animations.value, character)

const currentAction = ref(actions['shevas_iddle'])

const actionsCtrl = useControls({
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
  ],
  value: 'shevas_iddle',
  /*  options: Object.entries(actions).map(([key, value]) => ({
    text: key,
    value,
  })), */
})

watch(actionsCtrl.value, ({ value }) => {
  if (currentAction.value) currentAction.value.stop()
  
  /*   currentAction.value.stop() */
  currentAction.value = actions[value]
  currentAction.value.play()
}, {
  immediate: true,
})
/* watch(actionsCtrl.value, (value) => {
  console.log({ value })
}) */

/* currentAction.value.play() */

const body = seekByName(character.value, 'CubeBody002_1')
const insideMouth = seekByName(character.value, 'CubeBody002_2')
const hair = seekByName(character.value, 'CubeBody002_3')
const teeth = seekByName(character.value, 'CubeBody002_4')
const tongue = seekByName(character.value, 'CubeBody002')

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

const shirt = seekByName(character.value, 'ShevasCShirt')
const shorts = seekByName(character.value, 'ShevasCShorts')

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
  <primitive :object="toRaw(character)" />
</template>