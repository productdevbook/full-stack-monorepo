import { Platform, Type } from '@mikro-orm/core'

export class EncryptedType extends Type<string, string> {
  encryptionKey = process.env.SECRET_KEY
  constructor() {
    super()
    this.encryptionKey = process.env.SECRET_KEY
  }

  convertToDatabaseValue(value: string, _platform: Platform): string {
    if (!value)
      return ''

    return value
  }

  convertToJSValue(value: string, _platform: Platform): string {
    if (!value)
      return ''

    return value
  }

  convertToJSValueSQL(key: string) {
    return `pgp_sym_decrypt(${key}::bytea,'${this.encryptionKey}', 'cipher-algo=aes256')`
  }

  convertToDatabaseValueSQL(key: string) {
    return `pgp_sym_encrypt(${key}, '${this.encryptionKey}', 'compress-algo=1, cipher-algo=aes256')`
  }

  getColumnType(): string {
    return 'bytea'
  }
}
