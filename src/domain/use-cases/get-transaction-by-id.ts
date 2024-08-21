import { Transaction } from '../entities/transaction'
import { TransactionsRepository } from '../repositories/transaction-repository'

interface GetTransactionByIdUseCaseRequest {
  id: string
}

interface GetTransactionByIdUseCaseResponse {
  transaction: Transaction
}

export class GetTransactionByIdUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    id,
  }: GetTransactionByIdUseCaseRequest): Promise<GetTransactionByIdUseCaseResponse> {
    const transaction = await this.transactionsRepository.findById(id)
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    return { transaction }
  }
}
