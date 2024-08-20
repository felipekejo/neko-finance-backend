import { TypeTransaction } from '../entities/category'
import { BudgetsRepository } from '../repositories/budget-repository'
import { CategoriesRepository } from '../repositories/category-repository'

interface EditCategoryUseCaseRequest {
  categoryId: string
  budgetId: string
  name: string
  type: TypeTransaction
  ownerId: string
}

interface EditCategoryUseCaseResponse {}

export class EditCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    categoryId,
    budgetId,
    name,
    type,
    ownerId,
  }: EditCategoryUseCaseRequest): Promise<EditCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)
    const budget = await this.budgetsRepository.findById(budgetId)
    if (!category) {
      throw new Error('Category not found')
    }
    if (!budget) {
      throw new Error('Budget not found')
    }

    if (budget.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    category.name = name
    category.type = type

    await this.categoriesRepository.save(category)
    return {}
  }
}
