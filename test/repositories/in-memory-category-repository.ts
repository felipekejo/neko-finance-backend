import { Category } from '@/domain/entities/category'
import { CategoriesRepository } from '@/domain/repositories/category-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []
  async create(category: Category) {
    this.items.push(category)
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id.toString() === id)
    if (!category) {
      return null
    }
    return category
  }

  async delete(category: Category): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === category.id)
    this.items.splice(itemIndex, 1)
  }

  async save(category: Category): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === category.id)

    this.items[itemIndex] = category
  }
}
