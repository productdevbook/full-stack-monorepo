import { readFileSync } from 'fs'
import { join } from 'path'

export function getSQL(name: string) {
  const path = join(process.cwd(), 'src/sql', `${name}.sql`)
  const f = readFileSync(path)
  return f.toString()
}

export function getSeedSQL(name: string) {
  const path = join(process.cwd(), 'seeders/data', `${name}.sql`)
  const f = readFileSync(path)
  return f.toString()
}

export function getSeedCsv(name: string) {
  const path = join(process.cwd(), 'seeders/data', `${name}.csv`)
  const f = readFileSync(path)
  return f
}
