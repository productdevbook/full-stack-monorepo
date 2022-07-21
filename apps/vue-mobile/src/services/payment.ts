/* eslint-disable no-console */
import {
  CapacitorPurchases,
  Offering,
  Package,
  PurchaserInfo,
} from 'capacitor-purchases'

import { isPlatform } from '@ionic/vue'
import { setPaidOldPlan, setPaidPlan } from './crips'
// import {trackEvent} from './plausible'

export interface IAPProductCustom {
  status: 'paid' | 'free'
  id_ios: string
  id_android: string
}

export const initIap = (id: string) => {
  if (isPlatform('capacitor')) {
    CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
    CapacitorPurchases.setup({ apiKey: id })
  }
}

export const restore = async (): Promise<PurchaserInfo | null> => {
  if (!isPlatform('capacitor'))
    return null

  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  // console.log('restore', res)
  const ids: string[] = []
  const idsOld: string[] = []
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })
  purchaserInfo.allPurchasedProductIdentifiers.forEach((id) => {
    idsOld.push(id)
  })
  setPaidPlan(ids.join(','))
  setPaidOldPlan(idsOld.join(','))
  return purchaserInfo
}

export const getPurchaserInfo = async (): Promise<{
  data: PurchaserInfo
  isPayment: boolean
}> => {
  const res = await CapacitorPurchases.getPurchaserInfo()
  const isPayment = res.purchaserInfo.activeSubscriptions.length > 0
  return {
    data: res.purchaserInfo,
    isPayment,
  }
}

export const purchase = async (p: Package): Promise<PurchaserInfo | null> => {
  try {
    console.log('purchase', p)
    const data = await CapacitorPurchases.purchasePackage({
      identifier: p.identifier,
      offeringIdentifier: p.offeringIdentifier,
    })
    const purchaserInfo = data.purchaserInfo
    console.log('listenBuy', purchaserInfo)
    if (purchaserInfo.activeSubscriptions.includes(p.identifier))
      setPaidPlan(p.identifier)
      // TODO event takibi eklenecek
      // trackEvent('purchased', {
      //   identifier: p.identifier,
      // })

    return purchaserInfo
  }
  catch (e) {
    console.error('listenBuy error', e)
  }
  return null
}

export const getCurrentOfferings = async (): Promise<Offering | null> => {
  const { offerings } = await CapacitorPurchases.getOfferings()
  // return offerings ? offerings.all['default'] : null // for debug only
  return offerings ? offerings.current : null
}

export const getCurrentPrice = (p: Package) => {
  if (p.product?.introductoryPrice?.price)
    return p.product.introductoryPrice.price
  else
    return p?.product?.price || 0
}

export const showCurrentPrice = (p: Package) => {
  if (p.product?.introductoryPrice?.priceString)
    return p.product.introductoryPrice.priceString
  else
    return p?.product?.priceString || ''
}
export const findPackage = async (
  productId: string,
): Promise<Package | null> => {
  const offering = await getCurrentOfferings()
  console.log('findPackage', offering)
  if (!offering)
    return null

  for await (const p of offering.availablePackages) {
    console.log(p.product.identifier)
    if (p.product.identifier === productId)
      return p
  }
  return null
}
export const isAnyActiveSub = (
  productIds: string[],
  pInfo: PurchaserInfo | null,
): boolean => {
  let activeSub = false
  if (pInfo && pInfo.activeSubscriptions.length && productIds)
    activeSub = pInfo.activeSubscriptions.some(id => productIds.includes(id))

  console.log('isPurchased', productIds, pInfo, activeSub)
  return activeSub
}
export const isPurchased = (
  productId: string,
  pInfo: PurchaserInfo | null,
): boolean => {
  let purchased = false
  if (pInfo && productId)
    purchased = pInfo.allPurchasedProductIdentifiers.includes(productId)

  console.log('isPurchased', productId, pInfo, purchased)
  return purchased
}
