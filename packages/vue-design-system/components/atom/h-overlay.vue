<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return { onClick }
    function onClick(event: MouseEvent) {
      emit('click', event)
    }
  },
})
</script>

<template>
  <div
    class="h-overlay"
    :class="{ active, absolute, 'has-click': clickable }"
    @click="onClick"
  >
    <div class="overlay" />
    <div v-if="active" class="content">
      <slot />
    </div>
  </div>
</template>

<style>
  body {
    --h-overlay-color: var(--overlay-color);
    --h-overlay-z-index: 600;
  }
</style>

<style lang="scss" scoped>
  .h-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--h-overlay-z-index);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    &.has-click {
      cursor: pointer;
    }
    &.absolute {
      position: absolute;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--h-overlay-color);
      opacity: 0;
      transition: opacity var(--slow) var(--transition);
    }
    &.active {
      pointer-events: auto;
      .overlay {
        opacity: 0.5;
      }
    }
    .content {
      position: relative;
    }
  }
</style>
