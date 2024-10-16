import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Budget } from '../entities/budget'
import { UserBudget } from '../entities/user-budget'
import { BudgetsRepository } from '../repositories/budget-repository'
import { UserBudgetRepository } from '../repositories/user-budget-repository'

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
  constructor(
    private budgetsRepository: BudgetsRepository,
    private userBudgetRepository: UserBudgetRepository,
  ) {}

  async execute({
    name,
    ownerId,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const budget = Budget.create({
      name,
    })
    const userBudget = UserBudget.create({
      userId: new UniqueEntityID(ownerId),
      budgetId: budget.id,
    })

    await this.budgetsRepository.create(budget)
    await this.userBudgetRepository.create(userBudget)
    return right({ budget })
  }
}
