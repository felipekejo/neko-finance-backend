import { TransactionsRepository } from '../repositories/transaction-repository'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
  budgetId: string
}

interface DeleteTransactionUseCaseResponse {}

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
    budgetId,
  }: DeleteTransactionUseCaseRequest): Promise<DeleteTransactionUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      throw new Error('Transaction not found')
    }
    if (transaction.budgetId.toString() !== budgetId) {
      throw new Error('Unauthorized')
    }

    await this.transactionsRepository.delete(transaction)
    return {}
  }
}
