import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'

import { GeneratorService } from './services/generator.service'
import { ValidatorService } from './services/validator.service'
import { TranslateModule } from '@/modules/translate/translate.module'
import { MailService } from '@/services/mail.service'
@Global()
@Module({
  imports: [HttpModule, TranslateModule],
  providers: [ValidatorService, GeneratorService, MailService],
  exports: [HttpModule, ValidatorService, GeneratorService, TranslateModule, MailService],
})
export class SharedModule {}
