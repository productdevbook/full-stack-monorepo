import { NotificationOptions } from 'naive-ui'
import useRenderIcon from './useRenderIcon'

export function usePWebNotification() {
  const tSuccess = (options?: NotificationOptions | undefined, iconName?: string) => {
    return window.$notication.success({
      avatar: iconName ? useRenderIcon(iconName) : undefined,
      ...options,
    })
  }
  const tError = (options?: NotificationOptions | undefined, iconName?: string) => {
    return window.$notication.error({
      avatar: iconName ? useRenderIcon(iconName) : undefined,
      ...options,
    })
  }
  return { tSuccess, tError }
}
