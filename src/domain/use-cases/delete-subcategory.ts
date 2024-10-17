import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { BudgetsRepository } from '../repositories/budget-repository'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'
import { UserBudgetRepository } from '../repositories/user-budget-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteSubcategoryUseCaseRequest {
  subcategoryId: string
  userId: string
  budgetId: string
}

type DeleteSubcategoryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class DeleteSubcategoryUseCase {
  constructor(
    private subcategoriesRepository: SubcategoriesRepository,
    private budgetsRepository: BudgetsRepository,
    private userBudgetRepository: UserBudgetRepository,
  ) {}

  async execute({
    subcategoryId,
    userId,
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

    const userBudget = await this.userBudgetRepository.findByUserIdAndBudgetId(
      userId,
      budgetId,
    )

    if (!userBudget) {
      return left(new UnauthorizedError())
    }

    await this.subcategoriesRepository.delete(subcategory)
    return right({})
  }
}
