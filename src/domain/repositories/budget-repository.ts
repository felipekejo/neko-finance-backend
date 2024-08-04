import { Budget, Prisma } from '@prisma/client'

export interface BudgetsRepository {
  create(data: Prisma.BudgetCreateInput): Promise<Budget>
  findById(id: string): Promise<Budget | null>
}
