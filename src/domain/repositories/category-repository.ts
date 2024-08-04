import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>
  findById(id: string): Promise<Category | null>
}
