import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface TransactionProps {
  budgetId: UniqueEntityID
  accountId: UniqueEntityID
  description: string
  amount: number
  createdAt: Date
  updatedAt?: Date
}

export class Transaction extends Entity<TransactionProps> {
  static create(
    props: Optional<TransactionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const transaction = new Transaction(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return transaction
  }

  get description() {
    return this.props.description
  }

  get amount() {
    return this.props.amount
  }
}
