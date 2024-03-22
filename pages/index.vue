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
  <main class="min-h-100vh pt-96px as-container">
    <AsButton label="Accept" />
  </main>
</template>