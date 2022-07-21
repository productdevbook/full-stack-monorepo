import { User } from '@oku/api/types/schema'
import { defineStore } from 'pinia'
import { typeDark } from 'vue-app/types'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {} as User,
    isOrganization: false,
    userLanguage: '3e875cca-5297-44ac-a3c4-0e8199932268',
    remember: true,
    theme: 'light' as typeDark,
  }),
  getters: {},
  actions: {
    async hydrate() {},
    changeTheme(theme: typeDark) {
      this.theme = theme
    },
  },
})

export default useUserStore
