import { modalController } from '@ionic/vue'
import { ref } from 'vue'
import PaymentModal from '~/components/PaymentModal.vue'

export function usePaymentModal(open = false) {
  const data = ref(false)
  data.value = open
  const isPaymentModal = async () => {
    const modal = await modalController.create({
      component: PaymentModal,
    })
    return modal.present()
  }

  return {
    isPaymentModal,
  }
}
export default usePaymentModal
