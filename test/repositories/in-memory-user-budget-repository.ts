import { UserBudget } from '@/domain/entities/user-budget'
import { UserBudgetRepository } from '@/domain/repositories/user-budget-repository'

export class InMemoryUserBudgetRepository implements UserBudgetRepository {
  public items: UserBudget[] = []
  async findByUserIdAndBudgetId(userId: string, budgetId: string) {
    const budget = this.items.find(
      (item) =>
        item.budgetId.toString() === budgetId &&
        item.userId.toString() === userId,
    )
    if (!budget) {
      return null
    }

    return budget
  }
}
