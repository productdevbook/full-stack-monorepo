<route lang="yaml">
meta:
  auth: guest
</route>

<script setup lang="ts">
const router = useRouter()
onMounted(() => {
  router.push('/auth/login')
})
</script>

