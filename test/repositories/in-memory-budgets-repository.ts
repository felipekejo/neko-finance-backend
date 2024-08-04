import { Budget, Prisma } from '@prisma/client'

import { BudgetsRepository } from '@/domain/repositories//budget-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryBudgetsRepository implements BudgetsRepository {
  public items: Budget[] = []

  async create(data: Prisma.BudgetCreateInput) {
    const budget = {
      id: randomUUID(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: null,
      ownerId: data.owner.connect?.id,
    }

    this.items.push(budget)

    return budget
  }

  async findById(id: string) {
    const budget = this.items.find((item) => item.id === id)
    if (!budget) {
      return null
    }

    return budget
  }
}
