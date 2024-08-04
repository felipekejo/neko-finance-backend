import { SubcategoriesRepository } from '@/domain/repositories/subcategory-repository'
import { Prisma, SubCategory } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemorySubcategoriesRepository
  implements SubcategoriesRepository
{
  public items: SubCategory[] = []

  async findById(id: string) {
    const subcategory = this.items.find((item) => {
      return item.id === id
    })

    if (!subcategory) {
      return null
    }

    return subcategory
  }

  async create(data: Prisma.SubCategoryUncheckedCreateInput) {
    const subCategory = {
      id: data.id ?? randomUUID(),
      name: data.name,
      categoryId: data.categoryId,
      createdAt: new Date(),
      updatedAt: null,
    }

    return subCategory
  }
}
