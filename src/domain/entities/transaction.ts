import { Entity } from '@/core/entities/entity'

interface TransactionProps {
  description: string
  amount: number
}

export class Transaction extends Entity<TransactionProps> {
  get description() {
    return this.props.description
  }

  get amount() {
    return this.props.amount
  }
}
