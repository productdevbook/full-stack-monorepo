import { ToastOptions, toastController } from '@ionic/vue'

export async function useToast(message: string, options?: ToastOptions) {
  const toast = await toastController.create({
    ...options,
    message,
    duration: options?.duration ?? 2000,
  })
  await toast.present()
}
