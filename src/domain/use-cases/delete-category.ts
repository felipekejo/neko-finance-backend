import { BudgetsRepository } from '../repositories/budget-repository'
import { CategoriesRepository } from '../repositories/category-repository'

interface DeleteCategoryUseCaseRequest {
  categoryId: string
  ownerId: string
  budgetId: string
}

interface DeleteCategoryUseCaseResponse {}

export class DeleteCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    categoryId,
    ownerId,
    budgetId,
  }: DeleteCategoryUseCaseRequest): Promise<DeleteCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new Error('Category not found')
    }
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      throw new Error('Budget not found')
    }

    if (budget.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    await this.categoriesRepository.delete(category)
    return {}
  }
}
