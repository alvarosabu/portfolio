import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const cameraInitialAnimationEnd = ref(false)
  const scrollProgress = ref(0)

  return { cameraInitialAnimationEnd,
    scrollProgress }
})