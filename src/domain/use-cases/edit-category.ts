import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { TypeTransaction } from '../entities/category'
import { BudgetsRepository } from '../repositories/budget-repository'
import { CategoriesRepository } from '../repositories/category-repository'
import { UserBudgetRepository } from '../repositories/user-budget-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface EditCategoryUseCaseRequest {
  categoryId: string
  budgetId: string
  name: string
  type: TypeTransaction
  userId: string
}

type EditCategoryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class EditCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private budgetsRepository: BudgetsRepository,
    private userBudgetRepository: UserBudgetRepository,
  ) {}

  async execute({
    categoryId,
    budgetId,
    name,
    type,
    userId,
  }: EditCategoryUseCaseRequest): Promise<EditCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)
    const budget = await this.budgetsRepository.findById(budgetId)
    if (!category) {
      return left(new ResourceNotFoundError())
    }
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

    category.name = name
    category.type = type

    await this.categoriesRepository.save(category)
    return right({})
  }
}
