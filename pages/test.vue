<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace } from 'three'

const gl = reactive({
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
})

useControls('fpsgraph')
</script>

<template>
  <TresLeches class="important-fixed important-z-44 important-top-12" />
  <main class="mx-auto container h-90vh relative">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
      />

      <OrbitControls />
      <Suspense>
        <ShevasCharacter />
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