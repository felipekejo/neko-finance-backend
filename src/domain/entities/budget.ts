import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BudgetProps {
  ownerId: UniqueEntityID
  name: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Budget extends Entity<BudgetProps> {
  get name() {
    return this.props.name
  }

  get ownerId() {
    return this.props.ownerId
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

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  static create(
    props: Optional<BudgetProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const budget = new Budget(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return budget
  }
}
