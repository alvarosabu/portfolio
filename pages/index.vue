<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
useControls('fpsgraph')

useControls({
  accept: {
    label: 'Accept',
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      console.log('accept')
    },
    icon: 'i-logos-vue',
    size: 'sm',
  },
})
</script>

<template>
  <TresLeches class="important-fixed important-z-100" />

  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera
      :position="[0, 4, 20]"
      :look-at="[0, 4, 0]"
    />
    <OrbitControls />
    <!--  <TresGridHelper /> -->
    <Suspense>
      <Shevas />
    </Suspense>
    <TresAmbientLight :intensity="2" />
    <TresPointLight
      color="#1BFFEF"
      :position="[0, 8, -16]"
      :intensity="8"
      cast-shadow
    />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>