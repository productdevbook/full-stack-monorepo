import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  const auth = ref<null>()
  const path = ref('')

  return {
    auth,
    path,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
