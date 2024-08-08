import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@prisma/client/runtime/library'

interface AccountProps {
  ownerId: UniqueEntityID
  budgetId: UniqueEntityID
  name: string
  createdAt: Date
  updatedAt?: Date
  balance: number
}

export class Account extends Entity<AccountProps> {
  static create(
    props: Optional<AccountProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const transaction = new Account(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return transaction
  }

  get name() {
    return this.props.name
  }

  get ownerId() {
    return this.props.ownerId
  }

  get budgetId() {
    return this.props.budgetId
  }
}
