<script setup lang="ts">
import { openChat } from '~/services/crips'
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <div
        class="px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
      >
        <div class="mx-auto max-w-max">
          <main class="sm:flex">
            <p class="text-4xl font-extrabold text-orange-600 sm:text-5xl">
              404
            </p>
            <div class="sm:ml-6">
              <div class="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Page not found
                </h1>
                <p class="mt-1 text-base opacity-50">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div
                class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
              >
                <router-link
                  to="/app/home"
                  class="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Go back home
                </router-link>
                <a
                  href="#"
                  class="inline-flex items-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  @click="openChat"
                >
                  Contact support
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
