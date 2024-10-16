import { UserBudget } from '../entities/user-budget'

export abstract class UserBudgetRepository {
  abstract create(userBudget: UserBudget): Promise<void>
  abstract findByUserAndBudget(
    userId: string,
    budgetId: string,
  ): Promise<UserBudget | null>

  abstract delete(userBudget: UserBudget): Promise<void>
}
