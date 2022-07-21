import path from 'path'
import dotenv from 'dotenv'

const envFileName = process.env.NODE_ENV
  ? `.${process.env.NODE_ENV}.env`
  : '.env'

dotenv.config({
  path: path.resolve(__dirname, `../../${envFileName}`),
})

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: parseInt(process.env.DATABASE_PORT),
}
