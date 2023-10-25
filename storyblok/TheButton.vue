<script setup lang="ts">
defineProps({ blok: Object })
</script>

<template>
  <AsButton
    :variant="blok.variant"
    :label="blok.label"
    :outline="blok.outline"
    :flat="blok.flat"
  />
</template>