import { onMounted, ref, watchEffect } from 'vue'
import { Modifier, OptionsGeneric, createPopper } from '@popperjs/core'

export function usePopper(
  options: Partial<OptionsGeneric<Partial<Modifier<any, any>>>> | undefined,
) {
  const reference = ref<any>(null)
  const popper = ref<any>(null)

  onMounted(() => {
    watchEffect((onInvalidate) => {
      if (!popper.value)
        return

      if (!reference.value)
        return

      const popperEl = popper.value.el || popper.value
      const referenceEl = reference.value.el || reference.value

      if (!(referenceEl instanceof HTMLElement))
        return

      if (!(popperEl instanceof HTMLElement))
        return

      const { destroy } = createPopper(referenceEl, popperEl, options)

      onInvalidate(destroy)
    })
  })

  return [reference, popper]
}
