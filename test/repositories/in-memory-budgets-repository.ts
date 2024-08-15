import { Budget } from '@/domain/entities/budget'
import { BudgetsRepository } from '@/domain/repositories//budget-repository'

export class InMemoryBudgetsRepository implements BudgetsRepository {
  public items: Budget[] = []

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

  async findById(id: string) {
    const budget = this.items.find((item) => item.id.toString() === id)
    if (!budget) {
      return null
    }

    return budget
  }
}
