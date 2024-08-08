import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface UserProps {
  name: string
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id,
    )
    return user
  }

  get name() {
    return this.props.name
  }
}
