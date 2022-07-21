import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlOptionsFactory } from '@nestjs/graphql'
import { BaseRedisCache } from 'apollo-server-cache-redis'
import responseCachePlugin from 'apollo-server-plugin-response-cache'

import GraphQLJSON from 'graphql-type-json'
import { IConfig } from './interfaces/config.interface'
// import { ISubscriptionCtx } from '@/core/interfaces/subscription-ctx.interface'
import { ICtx } from '@/core/interfaces/ctx.interface'
import { AuthService } from '@/modules/auth/auth.service'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private readonly cookieName: string
  private readonly testing: boolean
  constructor(
    private readonly configService: ConfigService<IConfig>,
    private readonly authService: AuthService,
  ) {
    this.cookieName = this.configService.get('jwt.refresh.cookieName', { infer: true })!
    this.testing = this.configService.get<boolean>('testing')!
  }

  public createGqlOptions(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      context: ({ req, res }): ICtx => ({
        req,
        res,
      }),
      autoSchemaFile: './schema.graphql',
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp',

      },
      resolvers: { JSON: GraphQLJSON },
      cors: {
        credentials: true,
        origin: true,
      },
      definitions: {
        customScalarTypeMapping: {
          DateTime: 'Date',
        },
      },
      formatResponse: response => response,
      formatError: error => error,
      introspection: process.env.NODE_ENV === 'development',
      installSubscriptionHandlers: true,
      debug: this.testing,
      sortSchema: true,
      bodyParserConfig: false,
      playground: this.configService.get('playground'),
      plugins: [responseCachePlugin()],
      cache: this.testing
        ? undefined
        : new BaseRedisCache({
          client: this.configService.get('redis'),
        }),
      subscriptions: {
        'graphql-ws': {
          onConnect: async (ctx) => {
            const token = ctx?.connectionParams?.token as string | undefined

            if (!token)
              throw new UnauthorizedException()

            // await this.setHeader(
            //   (ctx.extra as ISubscriptionCtx).request,
            //   token,
            // )
          },
          // onSubscribe: (ctx, message) => {
          //   (ctx.extra as ISubscriptionCtx).payload = message.payload
          // },
          onClose: async (_ctx) => {
            // const token = (
            //   ctx.extra as ISubscriptionCtx
            // ).request.headers.authorization?.split(' ')[1] as string

            // if (token)
            //   await this.authService.closeUserSession(token)
          },
        },
      },
    }
  }

  //   private async setHeader(req: Request, token: string): Promise<void> {
  //     const cookieArr: string[] = req.headers.cookie?.split('; ') ?? []

  //     if (cookieArr.length > 0) {
  //       for (const cookie of cookieArr) {
  //         if (cookie.startsWith(`${this.cookieName}=`)) {
  //           const refreshToken = cookie.split('=')[1]
  //           const wsToken = await this.authService.generateWsAccessToken(
  //             token,
  //             refreshToken,
  //           )
  //           req.headers.authorization = `Bearer ${wsToken}`
  //           return
  //         }
  //       }
  //     }

//     throw new UnauthorizedException()
//   }
}

