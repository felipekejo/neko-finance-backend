import { Subcategory } from '@/domain/entities/subcategory'
import { SubcategoriesRepository } from '@/domain/repositories/subcategory-repository'

export class InMemorySubcategoriesRepository
  implements SubcategoriesRepository
{
  public items: Subcategory[] = []

  async findById(id: string) {
    const subcategory = this.items.find((item) => {
      return item.id.toString() === id
    })

    if (!subcategory) {
      return null
    }

    return subcategory
  }

  async create(subcategory: Subcategory) {

    this.items.push(subcategory)
  }
}
