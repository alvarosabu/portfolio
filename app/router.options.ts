import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        top: 0,
        left: 0,
      }
    }
    else {
      return {
        top: 0 }
    }
  },
}