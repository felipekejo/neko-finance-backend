import { Subcategory } from '@/domain/entities/subcategory'
import { SubcategoriesRepository } from '@/domain/repositories/subcategory-repository'
import { Injectable } from '@nestjs/common'
import { PrismaSubcategoryMapper } from '../mappers/prisma-subcategory-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSubcategoriesRepository implements SubcategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async delete(subcategory: Subcategory) {
    const data = PrismaSubcategoryMapper.toPrisma(subcategory)

    await this.prisma.subCategory.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(subcategory: Subcategory) {
    const data = PrismaSubcategoryMapper.toPrisma(subcategory)
    await this.prisma.subCategory.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findById(id: string) {
    const subcategory = await this.prisma.subCategory.findUnique({
      where: {
        id,
      },
    })

    if (!subcategory) {
      return null
    }

    return PrismaSubcategoryMapper.toDomain(subcategory)
  }

  async create(subcategory: Subcategory) {
    const data = PrismaSubcategoryMapper.toPrisma(subcategory)

    await this.prisma.subCategory.create({
      data,
    })
  }
}
