import { SubcategoriesRepository } from '@/domain/repositories/subcategory-repository'
import { Prisma } from '@prisma/client'

export class PrismaSubcategoriesRepository implements SubcategoriesRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: {
        id,
      },
    })

    if (!subcategory) {
      return null
    }

    return subcategory
  }

  async create(data: Prisma.SubCategoryUncheckedCreateInput) {
    const subcategory = await this.prisma.subcategory.create({
      data,
    })

    return subcategory
  }
}
