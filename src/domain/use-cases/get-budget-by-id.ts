import { Budget } from '../entities/budget'
import { BudgetsRepository } from '../repositories/budget-repository'

interface GetBudgetByIdUseCaseRequest {
  id: string
}

interface GetBudgetByIdUseCaseResponse {
  budget: Budget
}

export class GetBudgetByIdUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({
    id,
  }: GetBudgetByIdUseCaseRequest): Promise<GetBudgetByIdUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(id)
    if (!budget) {
      throw new Error('Budget not found')
    }
    return { budget }
  }
}
