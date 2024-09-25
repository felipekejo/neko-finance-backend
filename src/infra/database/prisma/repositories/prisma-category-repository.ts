import { Category } from '@/domain/entities/category'
import { CategoriesRepository } from '@/domain/repositories/category-repository'
import { Injectable } from '@nestjs/common'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCategoryRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async delete(category: Category) {
    const data = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(category: Category) {
    const data = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async create(category: Category) {
    const data = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.create({
      data,
    })
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }
}
