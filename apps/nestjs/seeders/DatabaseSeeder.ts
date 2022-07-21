import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
// import { UserFactory } from './factories/user.factory'
import { WorldFactory } from './factories/world.factory'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // new UserFactory(em).make(1000)
    new WorldFactory(em).run()
  }
}
