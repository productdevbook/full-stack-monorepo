import { defineStore } from 'pinia'
import { typeDark } from 'vue-app/types'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: { username: '', password: '' },
    currentUser: null,
    reading: null,
    isOrganization: false,
    loading: false,
    userLanguage: '3e875cca-5297-44ac-a3c4-0e8199932268',
    error: null,
    remember: true,
    timeReading: 0,
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
