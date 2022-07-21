import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EncryptionService {
  public key: Buffer

  /**
   * Encryption Service constructor
   */
  constructor(
    private readonly $configService: ConfigService,
  ) {
    const secret = this.$configService.get<string>('SECRET_KEY') as string
    this.key = scryptSync(secret, 'salt', 32) as Buffer
  }

  /**
   * Encrypt a string
   *
   * @param text The string to encrypt.
   */
  public async encrypt(text: string): Promise<string> {
    const iv = randomBytes(16)
    const cipher = createCipheriv('aes256', this.key, iv)

    const buf = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ])

    return `${iv.toString('hex')}:${buf.toString('hex')}`
  }

  /**
   * Decrypt a string
   *
   * @param text The string to decrypt
   */
  public async decrypt(text: string): Promise<String> {
    const [iv, encryptedText] = text.split(':').map(part => Buffer.from(part, 'hex'))
    const decipher = createDecipheriv('aes-256-ctr', this.key, iv)

    const buf = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ])

    return buf.toString()
  }
}
