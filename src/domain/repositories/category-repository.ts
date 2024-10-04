import { Category } from '../entities/category'

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<void>
  abstract findById(id: string): Promise<Category | null>
  abstract delete(category: Category): Promise<void>
  abstract save(category: Category): Promise<void>
}
