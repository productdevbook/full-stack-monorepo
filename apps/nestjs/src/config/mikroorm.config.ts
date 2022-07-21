import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IConfig } from './interfaces/config.interface'

@Injectable()
export class MikroOrmConfig implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<IConfig>) {}

  createMikroOrmOptions(): MikroOrmModuleOptions {
    return this.configService.get('db')!
  }
}
