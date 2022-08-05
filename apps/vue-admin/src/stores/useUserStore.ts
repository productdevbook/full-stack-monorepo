import { defineStore } from 'pinia'
import { typeDark } from 'vue-app/types'
import { GetUserInfoQuery } from '@oku/api'
import { apolloClient } from '~/modules/apollo-graphql'
export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {} as GetUserInfoQuery['me'],
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
    async onInit() {
      await this.getUser()
      return true
    },
    changeTheme(theme: typeDark) {
      this.theme = theme
    },
    async getUser() {
      const { data } = await apolloClient().query({ query: GetUserInfoDocument })
      if (data)
        this.user = data.me
    },
  },
})
