import { SelectedTheme } from 'vue-app/utils'
import { useUserStore } from '~/stores/useUserStore'

export const changeLocalStoreTheme = (select: SelectedTheme) => {
  const userStore = useUserStore()
  localStorage.setItem('vueuse-color-scheme', select)
  if (select === 'dark') {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    userStore.changeTheme('dark')
  }
  else if (select === 'light') {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    userStore.changeTheme('light')
  }
}
