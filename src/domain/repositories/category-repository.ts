import { Category } from '../entities/category'

export interface CategoriesRepository {
  create(category: Category): Promise<void>
  findById(id: string): Promise<Category | null>
  delete(category: Category): Promise<void>
  save(category: Category): Promise<void>
}
