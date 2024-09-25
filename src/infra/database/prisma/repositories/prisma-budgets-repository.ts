import { Budget } from '@/domain/entities/budget'
import { BudgetsRepository } from '@/domain/repositories/budget-repository'
import { Injectable } from '@nestjs/common'
import { PrismaBudgetMapper } from '../mappers/prisma-budget-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaBudgetsRepository implements BudgetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id,
      },
    })

    if (!budget) {
      return null
    }

    return PrismaBudgetMapper.toDomain(budget)
  }

  async create(budget: Budget) {
    const data = PrismaBudgetMapper.toPrisma(budget)
    await this.prisma.budget.create({
      data,
    })
  }

  async delete(budget: Budget) {
    const data = PrismaBudgetMapper.toPrisma(budget)

    await this.prisma.budget.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(budget: Budget) {
    const data = PrismaBudgetMapper.toPrisma(budget)

    await this.prisma.budget.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
