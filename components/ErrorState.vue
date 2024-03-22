<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    bg-gray-100
    p-4
    rounded
    relative
  >
    <div
      prose
      ml-auto
      xl:mx-auto
      pb-16
    >
      <h2 mb-8>
        {{ title }}
      </h2>
      <slot />
    </div>
    <img
      class="hidden lg:block absolute bottom-0 left-0 w-400px"
      src="/shevas_akward.webp"
      alt="404"
    >
  </div>
</template>