import { BudgetsRepository } from '../repositories/budget-repository'

interface DeleteBudgetUseCaseRequest {
  budgetId: string
  ownerId: string
}

interface DeleteBudgetUseCaseResponse {

}

export class DeleteBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({ budgetId, ownerId }: DeleteBudgetUseCaseRequest):Promise<DeleteBudgetUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      throw new Error('Budget not found')
    }

    if (budget.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    await this.budgetsRepository.delete(budget)
    return {  }
  }
}
