import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { BudgetsRepository } from '../repositories/budget-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteBudgetUseCaseRequest {
  budgetId: string
  ownerId: string
}

type DeleteBudgetUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class DeleteBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({
    budgetId,
    ownerId,
  }: DeleteBudgetUseCaseRequest): Promise<DeleteBudgetUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (budget.ownerId.toString() !== ownerId) {
      return left(new UnauthorizedError())
    }

    await this.budgetsRepository.delete(budget)
    return right({})
  }
}
