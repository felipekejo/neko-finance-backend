import { BudgetsRepository } from '@/domain/repositories/budget-repository'
import { Prisma, PrismaClient } from '@prisma/client'

export class PrismaBudgetsRepository implements BudgetsRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id,
      },
    })

    return budget
  }

  async create(data: Prisma.BudgetCreateInput) {
    const budget = await this.prisma.budget.create({
      data,
    })

    return budget
  }
}
