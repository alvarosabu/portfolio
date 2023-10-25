<script setup lang="ts">
const props = defineProps<{ doc: any }>()
const { render } = useSbRichtext()
const root = render(props.doc)
</script>

<template>
  <root />
</template>