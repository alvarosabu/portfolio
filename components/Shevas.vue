<script setup lang="ts">
import { DoubleSide, MeshPhongMaterial } from 'three'

const props = defineProps<{
  progress: number
  greeting: boolean
}>()

const { scene, nodes, animations } = await useReactiveGLTF('/models/shevas_v2.glb')

const { progress, greeting } = toRefs(props)

const { seekByName } = useSeek()

const character = computed(() => nodes.value['rig'])

const { changeEyes, changeAction, greet } = useCharacterCtrl(character, animations)

const unwatchGretting = watch(greeting, (value) => {
  if (value) {
    greet()

    unwatchGretting()
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
const shirt = seekByName(character.value, 'ShevasCShirt') as TresObject
const shorts = seekByName(character.value, 'ShevasCShorts') as TresObject

shirt?.scale.set(1.5, 1.5, 1.5)

shorts.material = new MeshPhongMaterial({
  color: '#978F6C',
  side: DoubleSide,
})
</script>

<template>
  <primitive :object="toRaw(character)" />
</template>