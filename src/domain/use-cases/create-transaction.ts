import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '../entities/transaction'
import { TransactionsRepository } from '../repositories/transaction-repository'

interface CreateTransactionUseCaseRequest {
  budgetId: string
  accountId: string
  description: string
  amount: number
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    description,
    accountId,
    budgetId,
    amount,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      description,
      accountId: new UniqueEntityID(accountId),
      budgetId: new UniqueEntityID(budgetId),
      amount,
    })
    await this.transactionsRepository.create(transaction)
    return { transaction }
  }
}
