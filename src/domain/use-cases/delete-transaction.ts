import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { BudgetsRepository } from '../repositories/budget-repository'
import { TransactionsRepository } from '../repositories/transaction-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
  budgetId: string
  ownerId: string
}

type DeleteTransactionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
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
      return left(new ResourceNotFoundError())
    }

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    if (budget.ownerId.toString() !== ownerId) {
      return left(new UnauthorizedError())
    }

    await this.transactionsRepository.delete(transaction)
    return right({})
  }
}
