import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Budget } from '../entities/budget'
import { UserBudget } from '../entities/user-budget'
import { BudgetsRepository } from '../repositories/budget-repository'

interface CreateBudgetUseCaseRequest {
  name: string
  userId: string
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
    userId,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const budget = Budget.create({
      name,
    })
    UserBudget.create({
      userId: new UniqueEntityID(userId),
      budgetId: budget.id,
    })

    await this.budgetsRepository.create(budget)

    return right({ budget })
  }
}
