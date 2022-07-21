import { ComputedRef, PropType, computed } from 'vue'

export const sizeProps = {
  size: {
    type: String as PropType<'xs' | 'sm' | 'base' | 'lg' | 'xl'>,
    required: false,
  },
}

interface RequiredProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'false'
}

type returnSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

export default function useSizeClass<T>(
  props: T & RequiredProps,
): ComputedRef<returnSize | null> {
  const sizeClass = computed<returnSize | null>(() => {
    if (props.size === 'xs')
      return 'xs'
    if (props.size === 'sm')
      return 'sm'
    if (props.size === 'base')
      return 'base'
    if (props.size === 'lg')
      return 'lg'
    if (props.size === 'xl')
      return 'xl'
    return null
  })

  return sizeClass
}
