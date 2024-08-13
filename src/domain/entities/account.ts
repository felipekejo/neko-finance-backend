import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface AccountProps {
  ownerId: UniqueEntityID
  budgetId: UniqueEntityID
  name: string
  createdAt: Date
  updatedAt?: Date
  balance: number
}

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get ownerId() {
    return this.props.ownerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get budgetId() {
    return this.props.budgetId
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get balance() {
    return this.props.balance
  }

  static create(
    props: Optional<AccountProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const account = new Account(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return account
  }
}
