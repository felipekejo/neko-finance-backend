import { Budget } from '@/domain/entities/budget'
import { BudgetsRepository } from '@/domain/repositories/budget-repository'

export class InMemoryBudgetsRepository implements BudgetsRepository {
  public items: Budget[] = []
  async findById(id: string) {
    const budget = this.items.find((item) => item.id.toString() === id)
    if (!budget) {
      return null
    }

    return budget
  }

  async create(data: Budget) {
    // const budget = {
    //   name: data.name,
    //   ownerId: data.ownerId,
    //   createdAt: new Date(),
    //   updatedAt: null,
    // }

    this.items.push(data)

    // return { budget }
  }

  async delete(budget: Budget): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === budget.id)

    this.items.splice(itemIndex, 1)
  }
}
