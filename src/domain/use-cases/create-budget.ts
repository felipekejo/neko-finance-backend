import { Budget } from '../entities/budget'
import { BudgetsRepository } from '../repositories/budget-repository'

interface CreateBudgetUseCaseRequest {
  name: string
  ownerId: string
}

// interface CreateBudgetUseCaseResponse {
//   budget: Budget
// }

export class CreateBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({ name, ownerId }: CreateBudgetUseCaseRequest) {
    const budget = new Budget({ name, ownerId })

    return { budget }
  }
}
