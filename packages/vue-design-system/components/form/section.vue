<script setup lang="ts">
const emit = defineEmits<{ (e: 'okuSubmit', value: Event): void }>()

const okuSubmit = (e: Event) => {
  emit('okuSubmit', e)
}
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <AtomSectionTitle v-if="$slots.title || $slots.description">
      <template #title>
        <slot name="title" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </AtomSectionTitle>

    <div
      class="mt-5 md:mt-0"
      :class="
        $slots.title || $slots.description ? 'md:col-span-2' : 'col-span-full'
      "
    >
      <form @submit.prevent="okuSubmit($event)">
        <div class="mb-4 grid grid-cols-6 gap-6">
          <slot name="form" />
        </div>

        <div
          v-if="$slots.actions"
          class="flex items-center justify-end py-3 text-right"
        >
          <slot name="actions" />
        </div>
      </form>
      <slot />
    </div>
  </div>
</template>
