<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { Html, OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const cards = ref([{
  title: 'Talks',
  slug: 'talks',
  media: 'https://a.storyblok.com/f/114518/1879x981/b628e99254/viteconf-2023-how-vite-is-powering-the-tresjs-ecosystem.png?cv=NaN',
  rotation: [0, Math.PI / 6, 0],
  position: [0, 0, -1],
}, {
  title: 'Blog',
  slug: 'blog',

  media: 'https://a.storyblok.com/f/114518/2560x1440/8a3a5489b4/article-build-3d-scenes-declaratively-with-tresjs-using-vue.png',
  rotation: [0, 0, 0],
  position: [5, 0, -2],
}, {
  title: 'Projects',
  slug: 'projects',

  media: 'https://a.storyblok.com/f/114518/1920x1080/b573439c87/wizardly-potions-classroom.png/m/1200x0/filters:format(webp)',
  rotation: [0, -Math.PI / 6, 0],
  position: [10, 0, -1],
}])
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[-1.4, 2.9, 12]" :look-at="[2, 2, 0]" />
    <TresGroup
      ref="cardSectionRef"
      :position="[-3, 4.5, -8]"
      :rotation="[0, -Math.PI / 6, 0]"
    >
      <TresMesh
        v-for="(card) in cards"
        :key="card.slug"
        :rotation="card.rotation"
        :position="card.position"
        :scale="[1.2, 1.2, 1.2]"
      >
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
        <Html
          v-bind="state"
          transform
        >
          <div
            class="
          bg-white
          p-2 rounded
          shadow-lg
          h-175px w-150px
          cursor-pointer
          scale-100 hover:scale-110
          transition-all duration-300"
          >
            <NuxtImg
              v-if="card.media"
              :src="card.media"
              width="300px"
              class="mb-4 rounded"
              aspect-ratio="16/9"
            />
            <h3 class="text-lg font-bold">
              {{ card.title }}
            </h3>
          </div>
        </Html>
      </TresMesh>
    </TresGroup>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
