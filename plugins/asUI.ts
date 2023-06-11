import { 
  AsImg, 
  AsModal,
  AsParticleLoader,
  AsKbd,
  AsButton,
  AsDarkModeToggle,
  AsBadge,
  AsCard,
  AsGraphic,
  AsIcon,
  AsTextImage, 
} from '@alvarosabu/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('AsParticleLoader', AsParticleLoader)
  nuxtApp.vueApp.component('AsImg', AsImg)
  nuxtApp.vueApp.component('AsKbd', AsKbd)
  nuxtApp.vueApp.component('AsModal', AsModal)
  nuxtApp.vueApp.component('AsButton', AsButton)
  nuxtApp.vueApp.component('AsBadge', AsBadge)
  nuxtApp.vueApp.component('AsIcon', AsIcon)
  nuxtApp.vueApp.component('AsTextImage', AsTextImage)
  nuxtApp.vueApp.component('AsCard', AsCard)
  nuxtApp.vueApp.component('AsGraphic', AsGraphic)
  nuxtApp.vueApp.component('AsDarkModeToggle', AsDarkModeToggle)
})
