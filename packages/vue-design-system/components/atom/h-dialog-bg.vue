<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue'
import { nanoid } from 'nanoid'
// import useViewPort from '../../composables/viewport'
import { useDialogRouteLeave, useShortcut } from '../../composables'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String as PropType<
          'center' | 'right' | 'bottom' | 'center-bottom'
        >,
      default: 'center',
      validator: (val: string) =>
        ['center', 'right', 'bottom', 'center-bottom'].includes(val),
    },
  },
  emits: ['esc', 'update:modelValue'],
  setup(props, { emit }) {
    // const { isSmallerDesktop } = useViewPort()
    useShortcut('escape', (event, cancelNext) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (internalActive.value) {
        emit('esc')
        cancelNext()
      }
    })

    const localActive = ref(false)

    const className = ref<string | null>(null)
    const id = computed(() => nanoid())

    const internalActive = computed({
      get() {
        return props.modelValue !== undefined
          ? props.modelValue
          : localActive.value
      },
      set(newActive: boolean) {
        localActive.value = newActive
        emit('update:modelValue', newActive)
      },
    })

    const leave = useDialogRouteLeave()

    return {
      emitToggle,
      className,
      nudge,
      leave,
      id,
      internalActive,
    }

    function emitToggle() {
      if (props.persistent === false)
        emit('update:modelValue', !props.modelValue)

      else
        nudge()
    }

    function nudge() {
      className.value = 'nudge'

      setTimeout(() => {
        className.value = null
      }, 200)
    }
  },
})
</script>

<template>
  <div class="h-dialog">
    <slot name="activator" v-bind="{ on: () => (internalActive = true) }" />

    <teleport to="#dialog-outlet">
      <transition name="fade">
        <AtomHOverlay
          v-if="internalActive"
          style="--h-overlay-z-index: 10"
          active
          absolute
          @click="emitToggle"
        />
      </transition>
      <transition
        :css="false"
        @after-leave="leave"
      >
        <component
          :is="placement === 'right' ? 'div' : 'span'"
          v-if="internalActive"
          class="h-container"
          :class="[className, placement]"
        >
          <slot />
        </component>
      </transition>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
  .h-dialog {
    --h-dialog-z-index: 100;

    display: contents;
  }

  .h-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .h-container.center {
    align-items: center;
    justify-content: center;
  }

  .h-container.center.nudge > :slotted(*:not(:first-child)) {
    animation: nudge 200ms;
  }

  .h-container.center-bottom {
    @apply items-end justify-center sm:items-center sm:justify-center;
  }

  .h-container.center-bottom.nudge > :slotted(*:not(:first-child)) {
    transform-origin: center;
    animation: shake 300ms;
  }

  .h-container.right {
    align-items: center;
    justify-content: flex-end;
  }

  .h-container.right.nudge > :slotted(*:not(:first-child)) {
    transform-origin: right;
    animation: shake 200ms;
  }

  .h-container :slotted(.h-card) {
    --h-card-min-width: calc(100vw - 40px);
    --h-card-padding: 28px;
    --h-card-background-color: var(--background-page);
  }

  .h-container :slotted(.h-drawer) {
    @apply overflow-hidden rounded-t-2xl lg:mr-4 lg:rounded-xl;
  }

  .h-container :slotted(.h-card) .h-card-title {
    padding-bottom: 8px;
  }

  .h-container :slotted(.h-card) .h-card-actions {
    flex-direction: column-reverse;
    flex-wrap: wrap;
  }

  .h-container :slotted(.h-card) .h-card-actions .h-button {
    width: 100%;
  }

  .h-container :slotted(.h-card) .h-card-actions .h-button .button {
    width: 100%;
  }

  .h-container :slotted(.h-card) .h-card-actions > .h-button + .h-button {
    margin-bottom: 20px;
    margin-left: 0;
  }

  .h-container :slotted(.h-sheet) {
    --h-sheet-padding: 24px;
    --h-sheet-max-width: 560px;
  }

  .h-container .h-overlay {
    --h-overlay-z-index: 1;
  }

  @media (min-width: 600px) {
    .h-container :slotted(.h-card) {
      --h-card-min-width: 540px;
    }

    .h-container :slotted(.h-card) .h-card-actions {
      flex-direction: inherit;
      flex-wrap: nowrap;
    }

    .h-container :slotted(.h-card) .h-card-actions .h-button {
      width: auto;
    }

    .h-container :slotted(.h-card) .h-card-actions .h-button .button {
      width: auto;
    }

    .h-container :slotted(.h-card) .h-card-actions > .h-button + .h-button {
      margin-bottom: 0;
      margin-left: 12px;
    }
  }

  @keyframes nudge {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.02);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes shake {
    0% {
      transform: scaleX(1);
    }

    50% {
      transform: scaleX(0.98);
    }

    100% {
      transform: scaleX(1);
    }
  }
</style>
