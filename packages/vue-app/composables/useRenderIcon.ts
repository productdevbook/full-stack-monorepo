import { h } from 'vue'
import UnoIcon from 'vue-design-system/components/UnoIcon.vue'

export default function useRenderIcon(icon: string) {
  return () => h(UnoIcon, { name: icon, style: '--h-icon-size: 18px;' })
}
