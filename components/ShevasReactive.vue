<script setup lang="ts">
import { onKeyDown, onKeyUp, watchDebounced } from '@vueuse/core'

import { MeshPhongMaterial, DoubleSide, Vector3, Quaternion } from 'three'

const { scene, nodes, animations } = await useReactiveGLTF('/models/shevas.glb')

const { seekByName } = useSeek()

const character = computed(() => nodes.value['rig'])

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
    {
      text: 'Greetings',
      value: 'shevas_greeting',
    },
  ],
  value: 'shevas_iddle',
  /*  options: Object.entries(actions).map(([key, value]) => ({
    text: key,
    value,
  })), */
})

watch(actionsCtrl.value, ({ value }) => {
  if (currentAction.value) {
    currentAction.value.fadeOut(0.2)
  }
  
  /*   currentAction.value.stop() */
  currentAction.value = actions[value]
  currentAction.value.reset()
  currentAction.value.fadeIn(0.2)
  currentAction.value.play()
}, {
  immediate: true,
})
/* watch(actionsCtrl.value, (value) => {
  console.log({ value })
}) */

/* currentAction.value.play() */

// Controls

const isMoving = ref(false)
const direction = ref('UP')
const acceleration = ref(new Vector3(0.5, 0.25, 20.0))
const decceleration = ref(new Vector3(-0.0005, -0.0001, -5.0))
const velocity = ref(new Vector3(0, 0, 0))

watch(isMoving, (value) => {
  if (value) {
    currentAction.value.fadeOut(0.2)
    currentAction.value = actions['shevas_walk']
    currentAction.value.reset()
    currentAction.value.fadeIn(0.2)
    currentAction.value.play()
  }
  else {
    currentAction.value.fadeOut(0.2)
    currentAction.value = actions['shevas_iddle']
    currentAction.value.reset()
    currentAction.value.fadeIn(0.2)
    currentAction.value.play()
  }
})

onKeyDown(['w', 'W', 'ArrowUp'], (e) => {
  e.preventDefault()
  isMoving.value = true
  direction.value = 'UP'
})

onKeyDown(['s', 'S', 'ArrowDown'], (e) => {
  e.preventDefault()
  isMoving.value = true
  direction.value = 'DOWN'
})

onKeyDown(['a', 'A', 'ArrowLeft'], (e) => {
  e.preventDefault()
  isMoving.value = true
  direction.value = 'LEFT'
})

onKeyDown(['d', 'D', 'ArrowRight'], (e) => {
  e.preventDefault()
  isMoving.value = true
  direction.value = 'RIGHT'
})

onKeyUp(['w', 'W', 'ArrowUp'], () => {
  isMoving.value = false
})

onKeyUp(['s', 'S', 'ArrowDown'], () => {
  isMoving.value = false
})

onKeyUp(['a', 'A', 'ArrowLeft'], () => {
  isMoving.value = false
})

onKeyUp(['d', 'D', 'ArrowRight'], () => {
  isMoving.value = false
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (isMoving.value) {
    const speed = velocity.value
    const frameDecceleration = new Vector3(
      speed.x * decceleration.value.x,
      speed.y * decceleration.value.y,
      speed.z * decceleration.value.z,
    )
    frameDecceleration.multiplyScalar(delta)
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
      Math.abs(frameDecceleration.z), Math.abs(speed.z))

    speed.add(frameDecceleration)

    const _Q = new Quaternion()
    const _A = new Vector3()
    const _R = character.value.quaternion.clone()

    const acc = acceleration.value.clone()

    switch (direction.value) {
      case 'UP':
        speed.z += acc.z * delta
        break
      case 'DOWN':
        speed.z -= acc.z * delta
        break
      case 'LEFT':
        _A.set(0, 1, 0)
        _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.value.y)
        _R.multiply(_Q)
        break
      case 'RIGHT':
        _A.set(0, 1, 0)
        _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.value.y)
        _R.multiply(_Q)
        break
    }

    character.value.quaternion.copy(_R)

    const oldPosition = new Vector3()
    oldPosition.copy(character.value.position)

    const forward = new Vector3(0, 0, 1)
    forward.applyQuaternion(character.value.quaternion)
    forward.normalize()

    const sideways = new Vector3(1, 0, 0)
    sideways.applyQuaternion(character.value.quaternion)
    sideways.normalize()

    sideways.multiplyScalar(speed.x * delta)
    forward.multiplyScalar(speed.z * delta)

    character.value.position.add(forward)
    character.value.position.add(sideways)

    oldPosition.copy(character.value.position)
  }
})

const body = seekByName(character.value, 'CubeBody002_1')
const insideMouth = seekByName(character.value, 'CubeBody002_2')
const hair = seekByName(character.value, 'CubeBody002_3')
const teeth = seekByName(character.value, 'CubeBody002_4')
const tongue = seekByName(character.value, 'CubeBody002')

body.material = new MeshPhongMaterial({
  color: '#C2A498',
})

hair.material = new MeshPhongMaterial({
  /* color: '#462A1D', */
  color: '#7F6758',
})

insideMouth.material = new MeshPhongMaterial({
  color: '#383434',
})

teeth.material = new MeshPhongMaterial({
  color: '#F2F2F2',
})

tongue.material = new MeshPhongMaterial({
  color: '#C23431',
})

// Clothes

const shirt = seekByName(character.value, 'ShevasCShirt')
const shorts = seekByName(character.value, 'ShevasCShorts')

shirt?.scale.set(1.5, 1.5, 1.5)
shirt.material = new MeshPhongMaterial({
  color: '#2B4052',
  side: DoubleSide,
})

shorts.material = new MeshPhongMaterial({
  color: '#978F6C',
  side: DoubleSide,
})
</script>

<template>
  <!--   <primitive :object="nodes['00ShevasEyesOpen']" /> -->
  <primitive :object="toRaw(character)" />
</template>