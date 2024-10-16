import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { BudgetsRepository } from '../repositories/budget-repository'
import { UserBudgetRepository } from '../repositories/user-budget-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteBudgetUseCaseRequest {
  budgetId: string
  userId: string
}

type DeleteBudgetUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class DeleteBudgetUseCase {
  constructor(
    private budgetsRepository: BudgetsRepository,
    private userBudgetRepository: UserBudgetRepository,
  ) {}

  async execute({
    budgetId,
    userId,
  }: DeleteBudgetUseCaseRequest): Promise<DeleteBudgetUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(budgetId)
    const userBudget = await this.userBudgetRepository.findByUserAndBudget(
      userId,
      budgetId,
    )

    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (!userBudget) {
      return left(new UnauthorizedError())
    }

    await this.budgetsRepository.delete(budget)
    return right({})
  }
}
