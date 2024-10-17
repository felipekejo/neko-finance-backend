import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserBudgetProps {
  userId: UniqueEntityID
  budgetId: UniqueEntityID
}

export class UserBudget extends Entity<UserBudgetProps> {
  get userId() {
    return this.props.userId
  }

  get budgetId() {
    return this.props.budgetId
  }

  static create(props: UserBudgetProps, id?: UniqueEntityID) {
    const userBudget = new UserBudget(props, id)
    return userBudget
  }
}
