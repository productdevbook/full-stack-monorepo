<script setup lang="ts">
const userStore = useUserStore()
const route = useRoute()
// if (route.path === '/' && store.dashboard.pages.length)
//   router.push(`/${store.dashboard.pages[0].page_id}`)

function scrollMainPanel(deltaY: number) {
  const element = document.getElementById('mainpanel')
  if (!element)
    return
  element.scrollBy({ top: deltaY, behavior: 'auto' })
}
</script>

<template>
  <div>
    <div class="relative min-h-screen flex flex-col">
      <div class="flex-grow w-full mx-auto sm:flex bg-surface dark:bg-surface-dark">
        <div v-if="userStore.user && userStore.user.id" class="sm:flex w-full transition">
          <SidePanel @scroll="scrollMainPanel" />
          <MainPanel id="mainpanel">
            <router-view v-slot="{ Component }">
              <transition mode="out-in">
                <component :is="Component" :key="route.fullPath" />
              </transition>
            </router-view>
          </MainPanel>
        </div>
      </div>
    </div>
    <TemLoadData :key="route.fullPath" />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0.3;
}
</style>
