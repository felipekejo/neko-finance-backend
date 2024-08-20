import { Subcategory } from '../entities/subcategory'

export interface SubcategoriesRepository {
  create(subcategory: Subcategory): Promise<void>
  findById(id: string): Promise<Subcategory | null>
  delete(subcategory: Subcategory): Promise<void>
  save(subcategory: Subcategory): Promise<void>
}
