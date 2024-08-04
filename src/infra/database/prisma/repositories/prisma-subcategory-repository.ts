import { SubcategoriesRepository } from '@/domain/repositories/subcategory-repository'
import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaSubcategoriesRepository implements SubcategoriesRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string) {
    const subcategory = await this.prisma.subCategory.findUnique({
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
    const subcategory = await this.prisma.subCategory.create({
      data,
    })

    return subcategory
  }
}
