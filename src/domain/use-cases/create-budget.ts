import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Budget } from '../entities/budget'
import { BudgetsRepository } from '../repositories/budget-repository'

interface CreateBudgetUseCaseRequest {
  name: string
  ownerId: string
}

type CreateBudgetUseCaseResponse = Either<
  null,
  {
    budget: Budget
  }
>

@Injectable()
export class CreateBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({
    name,
    ownerId,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const budget = Budget.create({
      name,
      ownerId: new UniqueEntityID(ownerId),
    })
    await this.budgetsRepository.create(budget)
    return right({ budget })
  }
}
