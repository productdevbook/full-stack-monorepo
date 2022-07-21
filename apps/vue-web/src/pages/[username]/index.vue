<route lang="yaml">
meta:
  auth: user
  layout: user
</route>

<script setup lang="ts">
const { tError, tSuccess } = useToastWeb()
// const { t } = useI18n()
const { logout, refreshToken } = useAuth()
const { result } = useGetUserInfoQuery()
const router = useRouter()
const logoutLoading = ref(false)

const logoutButton = () => {
  logout(null, {
    onLoading: (res) => {
      logoutLoading.value = res
    },
    onSuccess: (res) => {
      tSuccess('Logged out')
      router.push(res)
    },
    onError: (res) => {
      tError(res.error)
    },
  })
}

const refreshTokenSubmit = async () => {
  await refreshToken()
}
</script>

<template>
  <NButton @click="logoutButton">
    Logout
  </NButton>
  <NButton @click="refreshTokenSubmit">
    refreshToken
  </NButton>
  <div v-if="result">
    {{ result }}
  </div>
  a
</template>
