import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TypeTransaction } from '../entities/transaction'
import { AccountsRepository } from '../repositories/account-repository'
import { TransactionsRepository } from '../repositories/transaction-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface EditTransactionUseCaseRequest {
  transactionId: string
  budgetId: string
  ownerId: string
  accountId: string
  description: string
  amount: number
  type: TypeTransaction
}

type EditTransactionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

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

    transaction.description = description
    transaction.amount = amount
    transaction.type = type
    transaction.accountId = new UniqueEntityID(accountId)

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
        account.balance += amount
      } else {
        account.balance -= amount
      }
    }

    await this.accountsRepository.save(account)
    await this.transactionsRepository.save(transaction)

    return right({})
  }
}
