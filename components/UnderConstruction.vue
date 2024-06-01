<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
</script>
<template>
  <CameraCtrl />
  <PlanetSection />
  <TresDirectionalLight
    :position="[0, 2, 4]"
    :intensity="1"
    cast-shadow
  />
  <TresAmbientLight :intensity="2" />
</template>