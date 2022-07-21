import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Request } from 'express'
import UAParser from 'ua-parser-js'
import { UserDeviceEntity } from '@/entities/user-device.entity'
import { User } from '@/entities'

@Injectable()
export class UserDeviceRepository {
  constructor(
    @InjectRepository(UserDeviceEntity)
    private readonly userDeviceRepo: EntityRepository<UserDeviceEntity>,
  ) {
  }

  public async save(user: User, userDeviceHash: string, req: Request, userLoginAt: Date, userAgent: UAParser.IResult) {
    const userDevice = this.userDeviceRepo.create({
      user,
      userAgent,
      fingerprint: userDeviceHash,
      firstLoginIp: req.clientIp,
      lastLoginIp: req.clientIp,
      firstLoginAt: userLoginAt,
      lastLoginAt: userLoginAt,
      name: !userAgent.device.vendor
        ? `${userAgent.os.name} ${userAgent.os.version} ${userAgent.cpu.architecture}`
        : `${userAgent.device.vendor} ${userAgent.device.model}${
            userAgent.browser.name ? ` ${userAgent.browser.name}` : ''
            } ${userAgent.os.name} ${userAgent.os.version}`,
      type: !userAgent.device.vendor
        ? `${userAgent.os.name} ${userAgent.os.version} ${userAgent.cpu.architecture}`
        : `${userAgent.device.vendor} ${userAgent.device.model} ${userAgent.os.name} ${userAgent.os.version}`,
    })
    return this.userDeviceRepo.persistAndFlush(userDevice)
  }
}
