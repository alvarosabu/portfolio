<script lang="ts" setup></script>

<template>
  <div>
    <TheHeader />

    <div class="bg-white dark:bg-primary">
      <slot />
    </div>
  </div>
</template>

<style>
:root {
  --header-height: 48px;
}
</style>
