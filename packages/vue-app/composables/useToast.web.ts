import { MessageOptions } from 'naive-ui'
import useRenderIcon from './useRenderIcon'

export function useToastWeb() {
  const tSuccess = (text: string, options?: MessageOptions | undefined, iconName?: string) => {
    return window.$message.success(text, { duration: 2000, icon: iconName ? useRenderIcon(iconName) : undefined, ...options })
  }
  const tError = (text: string, options?: MessageOptions | undefined, iconName?: string) => {
    return window.$message.error(text, { duration: 2000, icon: iconName ? useRenderIcon(iconName) : undefined, ...options })
  }
  return { tSuccess, tError }
}
