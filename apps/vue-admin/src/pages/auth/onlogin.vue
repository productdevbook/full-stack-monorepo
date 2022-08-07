<script lang="ts" setup>
const userStore = useUserStore()
const router = useRouter()
onMounted(async () => {
  await userStore.onInit()
  setTimeout(() => {
    if (userStore.user)
      router.push(`/${userStore.user.username}`)
  }, 2000)
})
</script>

<template>
  <div class="flex items-center justify-center h-full w-full animate-pulse">
    <Logo class="h-10 w-auto" />
  </div>
</template>
