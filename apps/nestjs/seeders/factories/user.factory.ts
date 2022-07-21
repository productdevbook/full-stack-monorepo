import { pbkdf2Sync, randomBytes } from 'crypto'
import { Factory, Faker } from '@mikro-orm/seeder'
import { User } from '@/entities'

export class UserFactory extends Factory<User> {
  model = User

  createPasswordSalt() {
    return randomBytes(64).toString('base64')
  }

  createHashedPassword(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 9999, 64, 'sha512').toString('base64')
  }

  definition(faker: Faker): Partial<User> {
    const passwordSalt = this.createPasswordSalt()
    const hashedPassword = this.createHashedPassword(faker.internet.password(), passwordSalt)
    return {
      name: faker.name.firstName(),
      displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      username: faker.internet.userName(passwordSalt),
      password: hashedPassword,
      passwordSalt,
    }
  }
}

