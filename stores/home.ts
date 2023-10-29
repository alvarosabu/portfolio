import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const cameraInitialAnimationEnd = ref(false)
  const scrollProgress = ref(0)
  const hasFinishLoadingModels = ref(false)
  const sectionsNo = ref(1)
  const currentSection = computed(() => {
    const sectionSize = 1 / sectionsNo.value
    const sectionNumber = Math.floor(scrollProgress.value / sectionSize) + 1
    return Math.min(sectionNumber, sectionsNo.value)
  })

  return { 
    cameraInitialAnimationEnd,
    scrollProgress,
    hasFinishLoadingModels,
    sectionsNo,
    currentSection,
  }
})