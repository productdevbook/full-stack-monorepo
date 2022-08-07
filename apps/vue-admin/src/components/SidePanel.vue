<script setup lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'

import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const emit = defineEmits(['scroll'])
const { gUser } = useUserStore()
const route = useRoute()
async function signOut() {

}

function openLink(link: string, close: () => void) {

}

onMounted(() => {
  // Scroll mainpanel even when cursor is on sidepanel
  const sidePanel = document.getElementById('sidepanel')
  if (!sidePanel)
    return
  sidePanel.onwheel = (event: WheelEvent) => {
    emit('scroll', event.deltaY)
  }
})
</script>

<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
    <div class="flex items-center flex-shrink-0 px-6">
      <Logo class="h-16 w-auto mx-auto mb-10" />
    </div>
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
      <!-- User account dropdown -->
      <Menu as="div" class="px-3 relative inline-block text-left">
        <div>
          <MenuButton class="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
            <span class="flex w-full justify-between items-center">
              <span class="flex min-w-0 items-center justify-between space-x-3">
                <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" alt="">
                <span class="flex-1 flex flex-col min-w-0">
                  <span class="text-gray-900 text-sm font-medium truncate">{{ gUser.username }}</span>
                  <span class="text-gray-500 text-sm truncate">{{ gUser.email }}</span>
                </span>
              </span>
              <SelectorIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
            </span>
          </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-4 py-2 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">View profile</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-4 py-2 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">Settings</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-4 py-2 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">Notifications</a>
              </MenuItem>
            </div>
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-4 py-2 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">Get desktop app</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-4 py-2 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">Support</a>
              </MenuItem>
            </div>
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-4 py-2 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">Logout</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!-- Sidebar Search -->
      <div class="px-3 mt-5">
        <label for="search" class="sr-only">Search</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
            <SearchIcon class="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input id="search" type="text" name="search" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md" placeholder="Search">
        </div>
      </div>
      <!-- Navigation -->
      <nav class="px-3 mt-6">
        <div class="space-y-1">
          Roles
        </div>
      </nav>
    </div>
  </div>
</template>
