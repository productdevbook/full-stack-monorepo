<script  setup lang="ts">
const store = useUserStore()
onMounted(async () => {
  await store.onInit()
})
</script>

<template>
<!-- Component used to asynchronously run database queries on every page navigation -->
</template>
