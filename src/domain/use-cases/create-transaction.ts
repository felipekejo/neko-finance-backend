import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction, TypeTransaction } from '../entities/transaction'
import { AccountsRepository } from '../repositories/account-repository'
import { TransactionsRepository } from '../repositories/transaction-repository'

interface CreateTransactionUseCaseRequest {
  budgetId: string
  accountId: string
  description: string
  amount: number
  type: TypeTransaction
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  async execute({
    description,
    accountId,
    budgetId,
    amount,
    type,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      description,
      accountId: new UniqueEntityID(accountId),
      budgetId: new UniqueEntityID(budgetId),
      amount,
      type,
    })
    await this.transactionsRepository.create(transaction)

    const account = await this.accountsRepository.findById(accountId)
    if (account && type === 'INCOMES') {
      account.balance += amount
      await this.accountsRepository.save(account)
    }
    if (account && type === 'EXPENSES') {
      account.balance -= amount
      await this.accountsRepository.save(account)
    }

    return { transaction }
  }
}
