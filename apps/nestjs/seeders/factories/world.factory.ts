import { EntityManager, Reference } from '@mikro-orm/core'
import { parse } from 'csv-parse/sync'
import { getSeedCsv } from '@/core/utils'
import { Country } from '@/entities'
import { State } from '@/entities/state.entity'

export interface country {
  id: string
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  subregion: string
  timezones: Timezone
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
}

export interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

export interface IStates {
  id: string
  name: string
  country_id: string
  country_code: string
  country_name: string
  state_code: string
  type: string
  latitude: string
  longitude: string
}

export class WorldFactory {
  private readonly em: EntityManager
  constructor(em: EntityManager) {
    this.em = em
  }

  async run(): Promise<void> {
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
    await this.em.persistAndFlush(arrayData).catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e)
    })

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
        countryCode: element.country_code,
        countryName: element.country_name,
        stateCode: element.state_code,
        id: Number(element.id),
        latitude: element.latitude,
        longitude: element.longitude,
        name: element.name,
        type: element.type,
      })

      const data2 = new Country()
      data2.id = Number(element.country_id)
      dataState.country = Reference.create(data2)

      states.push(dataState)
    })

    await this.em.persistAndFlush(states)
    // const knex = (
    //   this.em.getConnection() as AbstractSqlConnection
    // ).getKnex()
    // // will get persisted automatically
    // await knex.raw(result)
  }
}
