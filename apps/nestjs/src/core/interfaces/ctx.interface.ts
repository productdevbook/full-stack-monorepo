import { Request, Response } from 'express'
import { ISubscriptionCtx } from './subscription-ctx.interface'

export interface ICtx {
  res: Response
  req: Request
  extra?: ISubscriptionCtx
}
