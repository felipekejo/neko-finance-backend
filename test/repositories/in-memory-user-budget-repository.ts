import { UserBudget } from '@/domain/entities/user-budget'
import { UserBudgetRepository } from '@/domain/repositories/user-budget-repository'

export class InMemoryUserBudgetRepository implements UserBudgetRepository {
  public items: UserBudget[] = []
  async findByUserAndBudget(userId: string, budgetId: string) {
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

  async create(userBudget: UserBudget) {
    this.items.push(userBudget)
    console.log(this.items)
  }

  async delete(userBudget: UserBudget): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) =>
        item.userId === userBudget.userId &&
        item.budgetId === userBudget.budgetId,
    )

    this.items.splice(itemIndex, 1)
  }
}
