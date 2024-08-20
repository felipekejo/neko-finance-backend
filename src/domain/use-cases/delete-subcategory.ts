import { BudgetsRepository } from '../repositories/budget-repository'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'

interface DeleteSubcategoryUseCaseRequest {
  subcategoryId: string
  ownerId: string
  budgetId: string
}

interface DeleteSubcategoryUseCaseResponse {}

export class DeleteSubcategoryUseCase {
  constructor(
    private subcategoriesRepository: SubcategoriesRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    subcategoryId,
    ownerId,
    budgetId,
  }: DeleteSubcategoryUseCaseRequest): Promise<DeleteSubcategoryUseCaseResponse> {
    const subcategory =
      await this.subcategoriesRepository.findById(subcategoryId)

    if (!subcategory) {
      throw new Error('Subcategory not found')
    }
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      throw new Error('Budget not found')
    }

    if (budget.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    await this.subcategoriesRepository.delete(subcategory)
    return {}
  }
}
