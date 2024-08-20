import { TypeTransaction } from '../entities/category'
import { CategoriesRepository } from '../repositories/category-repository'

interface EditCategoryUseCaseRequest {
  categoryId: string
  budgetId: string
  name: string
  type: TypeTransaction
}

interface EditCategoryUseCaseResponse {}

export class EditCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
    budgetId,
    name,
    type,
  }: EditCategoryUseCaseRequest): Promise<EditCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new Error('Category not found')
    }

    if (category.budgetId.toString() !== budgetId) {
      throw new Error('Unauthorized')
    }

    category.name = name
    category.type = type

    await this.categoriesRepository.save(category)
    return {}
  }
}
