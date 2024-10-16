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

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
  }

  set budgetId(budgetId: UniqueEntityID) {
    this.props.budgetId = budgetId
  }

  static create(props: UserBudgetProps, id?: UniqueEntityID) {
    console.log(props)
    const userBudget = new UserBudget(
      {
        ...props,
      },
      id,
    )
    // console.log(userBudget)
    return userBudget
  }
}
