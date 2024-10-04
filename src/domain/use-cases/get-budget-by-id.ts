import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Budget } from '../entities/budget'
import { BudgetsRepository } from '../repositories/budget-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetBudgetByIdUseCaseRequest {
  id: string
}

type GetBudgetByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    budget: Budget
  }
>

@Injectable()
export class GetBudgetByIdUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({
    id,
  }: GetBudgetByIdUseCaseRequest): Promise<GetBudgetByIdUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(id)
    if (!budget) {
      return left(new ResourceNotFoundError())
    }
    return right({ budget })
  }
}
