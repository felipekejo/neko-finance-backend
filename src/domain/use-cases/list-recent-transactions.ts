import { Transaction } from '../entities/transaction'
import { TransactionsRepository } from '../repositories/transaction-repository'

interface ListRecentTransactionsUseCaseRequest {
  page: number
}

interface ListRecentTransactionsUseCaseResponse {
  transactions: Transaction[]
}

export class ListRecentTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    page,
  }: ListRecentTransactionsUseCaseRequest): Promise<ListRecentTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findManyRecent({
      page,
    })
    return { transactions }
  }
}
