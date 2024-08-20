import { BudgetsRepository } from '../repositories/budget-repository'
import { TransactionsRepository } from '../repositories/transaction-repository'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
  budgetId: string
  ownerId: string
}

interface DeleteTransactionUseCaseResponse {}

export class DeleteTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    transactionId,
    budgetId,
    ownerId,
  }: DeleteTransactionUseCaseRequest): Promise<DeleteTransactionUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      throw new Error('Budget not found')
    }

    if (!transaction) {
      throw new Error('Transaction not found')
    }

    if (budget.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    await this.transactionsRepository.delete(transaction)
    return {}
  }
}
