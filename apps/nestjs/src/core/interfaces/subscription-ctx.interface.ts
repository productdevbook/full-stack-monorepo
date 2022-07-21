import { Request } from 'express'
// import { SubscribePayload } from 'graphql-ws'

export interface ISubscriptionCtx {
  socket: WebSocket
  request: Request
  // payload: SubscribePayload
}
