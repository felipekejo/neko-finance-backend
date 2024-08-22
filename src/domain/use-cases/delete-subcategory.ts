import { Either, left, right } from '@/core/either'
import { BudgetsRepository } from '../repositories/budget-repository'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteSubcategoryUseCaseRequest {
  subcategoryId: string
  ownerId: string
  budgetId: string
}

type DeleteSubcategoryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

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
      return left(new ResourceNotFoundError())
    }
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (budget.ownerId.toString() !== ownerId) {
      return left(new UnauthorizedError())
    }

    await this.subcategoriesRepository.delete(subcategory)
    return right({})
  }
}
