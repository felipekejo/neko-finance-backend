import { Entity } from '@/core/entities/entity'

interface BudgetProps {
  name: string
  ownerId: string
}

export class Budget extends Entity<BudgetProps> {
  get name() {
    return this.props.name
  }

  get ownerId() {
    return this.props.ownerId
  }
}
