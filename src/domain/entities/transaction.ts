import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface TransactionProps {
  description: string
  amount: number
  createdAt: Date
  updatedAt?: Date
  budgetId: UniqueEntityID
  accountId: UniqueEntityID
}

export class Transaction extends Entity<TransactionProps> {
  get description() {
    return this.props.description
  }

  get amount() {
    return this.props.amount
  }
}
