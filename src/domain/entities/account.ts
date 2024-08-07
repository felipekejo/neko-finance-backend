import { Entity } from '@/core/entities/entity'

interface AccountProps {
  name: string
  ownerId: string
  budgetId: string
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
