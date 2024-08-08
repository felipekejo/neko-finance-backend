import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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

  get ownerId() {
    return this.props.ownerId
  }

  get budgetId() {
    return this.props.budgetId
  }
}
