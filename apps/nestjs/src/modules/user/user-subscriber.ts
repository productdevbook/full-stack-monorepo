import { EntityName, EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core'
import { User } from '@/entities'

@Subscriber()
export class AuthorSubscriber implements EventSubscriber<User> {
  getSubscribedEntities(): EntityName<User>[] {
    return [User]
  }

  async afterCreate(args: EventArgs<User>): Promise<void> {
    console.log(args)
  }

  async afterUpdate(args: EventArgs<User>): Promise<void> {
    console.log(args)
  }
}
