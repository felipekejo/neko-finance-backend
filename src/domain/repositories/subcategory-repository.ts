import { Prisma, SubCategory } from '@prisma/client'

export interface SubcategoriesRepository {
  create(data: Prisma.SubCategoryUncheckedCreateInput): Promise<SubCategory>
  findById(id: string): Promise<SubCategory | null>
}
