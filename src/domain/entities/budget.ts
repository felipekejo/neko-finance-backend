import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@prisma/client/runtime/library'

interface BudgetProps {
  ownerId: UniqueEntityID
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Budget extends Entity<BudgetProps> {
  static create(
    props: Optional<BudgetProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const transaction = new Budget(
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
}
