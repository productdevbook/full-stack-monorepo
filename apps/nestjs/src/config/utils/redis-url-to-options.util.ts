import { RedisOptions } from 'ioredis'

export const redisUrlToOptions = (url: string): RedisOptions => {
  const arr = url.split('://:')[1].split('@')
  const secondArr = arr[1].split(':')

  return {
    password: arr[0],
    host: secondArr[0],
    port: parseInt(secondArr[1], 10),
  }
}
