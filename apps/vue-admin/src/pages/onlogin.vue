<script lang="ts" setup>
const userStore = useUserStore()
const router = useRouter()
onMounted(async () => {
  await userStore.onInit()
  setTimeout(() => {
    console.log(userStore.user)
    if (userStore.user)
      router.push(userStore.user.username)
  }, 2000)
})
</script>

<template>
  <div>
    {{ userStore }}
  </div>
</template>
