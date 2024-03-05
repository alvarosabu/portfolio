<script setup lang="ts">
import { Html } from '@tresjs/cientos'

const cards = ref([{
  title: 'Talks',
  slug: 'talks',
  media: 'https://a.storyblok.com/f/114518/1879x981/b628e99254/viteconf-2023-how-vite-is-powering-the-tresjs-ecosystem.png?cv=NaN',
  rotation: [0, Math.PI / 6, 0],
  position: [0, 0, -1],
}, {
  title: 'Blog',
  slug: 'blog',
  // eslint-disable-next-line max-len
  media: 'https://a.storyblok.com/f/114518/2560x1440/8a3a5489b4/article-build-3d-scenes-declaratively-with-tresjs-using-vue.png',
  rotation: [0, 0, 0],
  position: [5, 0, -2],
}, {
  title: 'Projects',
  slug: 'projects',
  // eslint-disable-next-line max-len
  media: 'https://a.storyblok.com/f/114518/1920x1080/b573439c87/wizardly-potions-classroom.png/m/1200x0/filters:format(webp)',
  rotation: [0, -Math.PI / 6, 0],
  position: [10, 0, -1],
}])

const state = reactive({
  wrapperClass: 'wrapper',
  as: 'div',
  center: true,
})

const store = useHomeStore()
const { currentSection } = storeToRefs(store)

const cardSectionRef = ref()

watch(cardSectionRef, ({ children }) => {
  children.forEach((item) => {
    item.scale.set(0, 0, 0)
  })
})

function resetAnimations() {
  cardSectionRef.value.children.forEach((item, $index) => {
    gsap.to(item.scale, {
      duration: 0.25,
      delay: $index * 0.1, // Duration of the animation in seconds
      x: 0,
      y: 0,
      z: 0,
      ease: 'power4.in', // Easing function for smoother animation
    })
  })
}

watch(currentSection, (value) => {
  if (value) {
    switch (value) {
      case 1:
        resetAnimations()
        break
      case 2:
        resetAnimations()
        break
      case 3:
        cardSectionRef.value.children.forEach((item, $index) => {
          gsap.to(item.scale, {
            delay: $index * 0.5,
            duration: 0.5, // Duration of the animation in seconds
            x: 0.75,
            y: 0.75,
            z: 0.75,
            ease: 'elastic.out', // Easing function for smoother animation
          })
        })
        break
    }
  }
})

onBeforeUnmount(() => {
  resetAnimations()
})
</script>

<template>
  <TresGroup
    ref="cardSectionRef"
    :position="[1, 4.5, -3]"
    :rotation="[0, -Math.PI / 6, 0]"
  >
    <TresMesh
      v-for="(card) in cards"
      :key="card.slug"
      :rotation="card.rotation"
      :position="card.position"
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
</template>