import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface BudgetProps {
  ownerId: UniqueEntityID
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Budget extends Entity<BudgetProps> {
  get name() {
    return this.props.name
  }

  get ownerId() {
    return this.props.ownerId
  }
}
