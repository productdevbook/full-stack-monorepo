import { EntityManager } from '@mikro-orm/core'
import { parse } from 'csv-parse/sync'
import { getSeedCsv } from '@/core/utils'
import { City, Country, State } from '@/entities'

export interface country {
  id: any
  name: any
  iso3: any
  iso2: any
  numeric_code: any
  phone_code: any
  capital: any
  currency: any
  currency_name: any
  currency_symbol: any
  tld: any
  native: any
  region: any
  subregion: any
  timezones: any
  latitude: any
  longitude: any
  emoji: any
  emojiU: any
}

export interface Timezone {
  zoneName: any
  gmtOffset: any
  gmtOffsetName: any
  abbreviation: any
  tzName: any
}

export interface ICity {
  id: any
  name: any
  country_id: any
  country_code: any
  country_name: any
  state_code: any
  type: any
  latitude: any
  longitude: any
}

export interface IStates {
  id: any
  name: any
  state_id: any
  state_code: any
  state_name: any
  country_id: any
  country_code: any
  country_name: any
  latitude: any
  longitude: any
  wikiDataId: any
}

export class WorldFactory {
  private readonly em: EntityManager
  constructor(em: EntityManager) {
    this.em = em
  }

  async run(): Promise<void> {
    // Country
    const result = getSeedCsv('countries')
    const rawInvoices = parse(result, {
      trim: true,
      columns: true,
      delimiter: ',',
      skip_empty_lines: true,
    }) as country[]
    const arrayData: Country[] = []
    rawInvoices.forEach((element: country) => {
      arrayData.push(this.em.create(Country, {
        ...element,
        currencyName: element.currency_name,
        currencySymbol: element.currency_symbol,
        subRegion: element.subregion,
        numericCode: element.numeric_code,
        phoneCode: element.phone_code,
        region: element.region,
        timeZones: element.timezones,
        id: Number(element.id),
      }))
    })
    this.em.persist(arrayData)

    // cities
    const resultCity = getSeedCsv('cities')
    const rawCity = parse(resultCity, {
      trim: true,
      columns: true,
      delimiter: ',',
      skip_empty_lines: true,
    }) as ICity[]

    const city: City[] = []

    rawCity.forEach((element: ICity) => {
      const dataCity = new City({
        id: element.id,
        name: element.name,
        latitude: element.latitude,
        longitude: element.longitude,
        type: element.type,
      })

      const repo = this.em.getRepository(Country)
      dataCity.country = repo.getReference(element.country_id)

      city.push(dataCity)
    })
    this.em.persist(city)

    // states
    const resultStates = getSeedCsv('states')
    const state = parse(resultStates, {
      trim: true,
      columns: true,
      delimiter: ',',
      skip_empty_lines: true,
    }) as IStates[]
    const states: State[] = []
    state.forEach((element: IStates) => {
      const dataState = new State({
        stateCode: element.state_code,
        id: Number(element.id),
        latitude: element.latitude,
        longitude: element.longitude,
        name: element.name,
        wikiDataId: element.wikiDataId,
      })
      const repo = this.em.getRepository(City)
      dataState.city = repo.getReference(element.country_id)
      states.push(dataState)
    })
    this.em.persist(states)

    await this.em.flush()
  }
}
