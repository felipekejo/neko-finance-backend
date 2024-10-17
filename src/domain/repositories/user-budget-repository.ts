import { UserBudget } from '../entities/user-budget'

export abstract class UserBudgetRepository {
  abstract findByUserIdAndBudgetId(
    userId: string,
    budgetId: string,
  ): Promise<UserBudget | null>
}
