import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import { i18nValidationErrorFactory } from 'nestjs-i18n'
import watchFile from '../scripts/watch'
import { getIPAdress } from './config/utils'
import { AppModule } from './app.module'
async function bootstrap() {
  if (process.env.NODE_ENV === 'development')
    await watchFile()

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  // app.use((req: any, res: any, next: any) => {
  //   console.log(req)
  //   next()
  // })

  const config = new ConfigService()

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: i18nValidationErrorFactory,
    }),
  )
  app.use(cookieParser())
  const ip = `http://${getIPAdress()}` + ':5000'

  const urls = config.get<string>('CORS_ORIGIN')!.split(',')
  urls.push(ip)
  app.enableCors({
    origin: [...urls, new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${5000}$/`), /^https?:\/\/192\.168\.0\.[0-9]{1,3}/],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port || 4000)
  // eslint-disable-next-line no-console
  console.log(`Api calismaya basladi. http://localhost:${port}/graphql`)
}
bootstrap()
