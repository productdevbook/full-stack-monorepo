import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EncryptionService } from './encryption.service'

describe('EncryptionService', () => {
  let service: EncryptionService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [EncryptionService, ConfigService],
    }).compile()

    service = module.get<EncryptionService>(EncryptionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('shold have a valid key', () => {
    expect(service.key).toBeDefined()
  })

  it('should encrypt a string', async () => {
    expect.assertions(3)
    const encryptedText = await service.encrypt('This is a string')
    expect(encryptedText).toBeDefined()
    expect(encryptedText.length).toBeGreaterThan(1)
    expect(typeof encryptedText).toBe('string')
  })

  it('should encrypt and decrypt a string', async () => {
    const theString = 'This is another string'
    expect.assertions(5)
    const encryptedText = await service.encrypt(theString)
    expect(encryptedText).toBeDefined()
    expect(encryptedText.length).toBeGreaterThan(1)
    const decryptedText = await service.decrypt(encryptedText)
    expect(decryptedText).toBeDefined()
    expect(decryptedText.length).toBe(theString.length)
    expect(decryptedText).toBe(theString)
  })
})
