import crypto from 'crypto'
import { Request } from 'express'
import UAParser from 'ua-parser-js'
import resolveAcceptLanguage from 'resolve-accept-language'

export const createDeviceHash = (
  req: Request,
  append?: Record<string, any>,
) => {
  const userLanguages = resolveAcceptLanguage(req.header('accept-language') as string, ['en-US', 'tr-TR'],
    'en-US')
  const userAgent = UAParser(req.header('user-agent'))
  return crypto
    .createHash('sha256')
    .update(
      JSON.stringify({
        languages: userLanguages,
        ua: {
          browser: {
            name: userAgent.browser.name,
          },
          engine: {
            name: userAgent.engine.name,
          },
          os: {
            name: userAgent.os.name,
          },
          device: userAgent.device,
          cpu: userAgent.cpu,
        } as UAParser.IResult,
        httpVersion: req.httpVersion,
        ...append,
      }),
    )
    .digest('hex')
}
