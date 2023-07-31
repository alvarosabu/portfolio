<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'

const gl = reactive({
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
})
</script>

<template>
  <main class="mx-auto container h-90vh relative">
    <TresLeches />
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
      />

      <OrbitControls />
      <Suspense>
        <ShevasReactive />
      </Suspense>
      <TresAmbientLight :intensity="2" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :cast-shadow="true"
      />
      <TresGridHelper />
    </TresCanvas>
  </main>
</template>