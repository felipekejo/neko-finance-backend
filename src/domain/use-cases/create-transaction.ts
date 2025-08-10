import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Transaction, TypeTransaction } from '../entities/transaction'
import { AccountsRepository } from '../repositories/account-repository'
import { TransactionsRepository } from '../repositories/transaction-repository'

interface CreateTransactionUseCaseRequest {
  budgetId: string
  accountId: string
  description: string
  amount: number
  type: TypeTransaction
  date: Date
  categoryId: string
}

type CreateTransactionUseCaseResponse = Either<
  null,
  {
    transaction: Transaction
  }
>

@Injectable()
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
    date,
    categoryId,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      date,
      description,
      accountId: new UniqueEntityID(accountId),
      budgetId: new UniqueEntityID(budgetId),
      amount,
      type,
      categoryId: new UniqueEntityID(categoryId),
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

    return right({ transaction })
  }
}
