import { BudgetsRepository } from '../repositories/budget-repository'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'

interface EditSubcategoryUseCaseRequest {
  subcategoryId: string
  budgetId: string
  name: string
  ownerId: string
}

interface EditSubcategoryUseCaseResponse {}

export class EditSubcategoryUseCase {
  constructor(
    private subcategoriesRepository: SubcategoriesRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    subcategoryId,
    budgetId,
    name,
    ownerId,
  }: EditSubcategoryUseCaseRequest): Promise<EditSubcategoryUseCaseResponse> {
    const subcategory =
      await this.subcategoriesRepository.findById(subcategoryId)

    const budget = await this.budgetsRepository.findById(budgetId)

    if (!subcategory) {
      throw new Error('Subcategory not found')
    }
    if (!budget) {
      throw new Error('Budget not found')
    }

    if (budget.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    subcategory.name = name

    await this.subcategoriesRepository.save(subcategory)
    return {}
  }
}
