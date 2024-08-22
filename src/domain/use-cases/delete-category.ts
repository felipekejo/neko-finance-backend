import { Either, left, right } from '@/core/either'
import { BudgetsRepository } from '../repositories/budget-repository'
import { CategoriesRepository } from '../repositories/category-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteCategoryUseCaseRequest {
  categoryId: string
  ownerId: string
  budgetId: string
}

type DeleteCategoryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

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
      return left(new ResourceNotFoundError())
    }
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (budget.ownerId.toString() !== ownerId) {
      return left(new UnauthorizedError())
    }

    await this.categoriesRepository.delete(category)
    return right({})
  }
}
