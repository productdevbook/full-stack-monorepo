import { Chart, registerables } from 'chart.js'
import type { AppModule } from 'vue-app/types'

export const install: AppModule = () => {
  Chart.register(...registerables)
}
