import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

interface ISendMail {
  template: IMailerContext
  subject: string
  to: string
  attachments?: ISendMailOptions['attachments']
}

type IMailerContext =
| {
  type: 'welcome'
  context: PWelcome
}
| {
  type: 'password-reset'
  context: PPasswordReset
}
| {
  type: 'password-reset-confirm'
  context: PPasswordResetConfirm
}

interface PWelcome {
  lang: string
  action_url: string
  login_url: string
  username: string
  help_url: string
  welcomeArgs: {
    username: string
    support_email: string
    live_chat_url: string
  }
}
interface PPasswordReset {
  lang: string
  action_url: string
  username: string
  help_url: string
  dArgs: {
    username: string
    operating_system: string
    browser_name: string
    help_url: string
    time: string
  }
}

interface PPasswordResetConfirm {
  lang: string
  action_url: string
  help_url: string
  dArgs: {
    operating_system: string
    browser_name: string
    help_url: string
    time: string
  }
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    data: ISendMail,
  ) {
    const options: ISendMailOptions = {
      to: data.to,
      subject: data.subject,
      template: data.template.type,
      context: data.template.context,
      attachments: data.attachments,
    }

    await this.mailerService.sendMail(options)
  }
}
