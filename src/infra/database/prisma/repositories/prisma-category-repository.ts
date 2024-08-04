import { CategoriesRepository } from '@/domain/repositories/category-repository'
import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaCategoryRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = await this.prisma.category.create({
      data,
    })

    return category
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  }
}
