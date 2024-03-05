<script setup lang="ts">
import type { TresObject3D } from '@tresjs/core'
import { DoubleSide, MeshPhongMaterial } from 'three'

const { nodes, scene } = await useGLTF(
  '/models/Planet.glb',
  { draco: true },
)

const { seekAllByName } = useSeek()

const planet = nodes['Planet'] as TresObject3D
const planetRef = shallowRef()

const palmTree = nodes['PalmTree'] as TresObject3D
const palmTreeRef = shallowRef()

const clouds = seekAllByName(scene, 'Cloud') as TresObject3D[]

const planetTexture = await useTexture(['/models/planet.png'])
planetTexture.flipY = false
const palmTreeTexture = await useTexture(['/models/palmtree.png'])
palmTreeTexture.flipY = false

planet.material = new MeshPhongMaterial({
  map: planetTexture,
})

palmTree.material = new MeshPhongMaterial({
  map: palmTreeTexture,
  side: DoubleSide,
})
</script>

<template>
  <TresGroup>
    <primitive
      ref="planetRef"
      :object="planet"
    />
    <primitive
      ref="palmTreeRef"
      :object="palmTree"
    />
    <primitive
      v-for="cloud in clouds"
      :key="cloud.uuid"
      :object="cloud"
    />
  </TresGroup>
</template>