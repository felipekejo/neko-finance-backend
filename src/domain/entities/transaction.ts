import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface TransactionProps {
  budgetId: UniqueEntityID
  accountId: UniqueEntityID
  description: string
  amount: number
  createdAt: Date
  updatedAt?: Date
}

export class Transaction extends Entity<TransactionProps> {
  get budgetId() {
    return this.props.budgetId
  }

  get accountId() {
    return this.props.accountId
  }

  set accountId(accountId: UniqueEntityID) {
    this.props.accountId = accountId
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get amount() {
    return this.props.amount
  }

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TransactionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const transaction = new Transaction(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return transaction
  }
}
