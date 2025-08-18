import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { TypeTransaction } from '../entities/transaction'
import { AccountsRepository } from '../repositories/account-repository'
import { TransactionsRepository } from '../repositories/transaction-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface EditTransactionUseCaseRequest {
  transactionId: string
  ownerId: string
  accountId: string
  description?: string
  amount?: number
  type?: TypeTransaction
  date?: Date
  categoryId?: string
}

type EditTransactionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class EditTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  async execute({
    transactionId,
    ownerId,
    accountId,
    amount,
    description,
    type,
    date,
    categoryId
  }: EditTransactionUseCaseRequest): Promise<EditTransactionUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)
    if (!transaction) return left(new ResourceNotFoundError())

    const oldAccountId = transaction.accountId.toString()
    const oldAmount = transaction.amount
    const oldType = transaction.type

    const account = await this.accountsRepository.findById(accountId)
    if (!account || account.ownerId.toString() !== ownerId) {
      return left(new UnauthorizedError())
    }

  if (description !== undefined) transaction.description = description
    if (amount !== undefined) transaction.amount = amount
    if (type !== undefined) transaction.type = type
    if (date !== undefined) transaction.date = date
    if (categoryId !== undefined) {
      transaction.categoryId = new UniqueEntityID(categoryId)
    }


    if (oldAccountId !== accountId) {
      const oldAccount = await this.accountsRepository.findById(oldAccountId)
      if (oldAccount) {
        if (oldType === 'INCOMES') {
          oldAccount.balance -= oldAmount
        } else {
          oldAccount.balance += oldAmount
        }
        await this.accountsRepository.save(oldAccount)
      }
    } else {
      if (type === 'INCOMES') {
        account.balance += transaction.amount
      } else {
        account.balance -= transaction.amount
      }
    }

    await this.accountsRepository.save(account)
    await this.transactionsRepository.save(transaction)

    return right({})
  }
}
