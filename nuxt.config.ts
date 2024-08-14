// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/scss/index.scss'
  ],
  modules: ["@nuxt/image", "nuxt-swiper"],
  swiper: {
    
  }

})