import { CategoriesRepository } from '@/domain/repositories/category-repository'
import { Category, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = {
      id: data.id ?? randomUUID(),
      name: data.name,
      type: data.type ?? 'EXPENSES',
      createdAt: new Date(),
      updatedAt: null,
      budgetId: data.budgetId,
    }
    this.items.push(category)
    return category
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id)
    if (!category) {
      return null
    }
    return category
  }
}
