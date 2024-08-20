import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'
import { DeleteTransactionUseCase } from './delete-transaction'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: DeleteTransactionUseCase

describe('Delete Transaction Use Case', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()
    sut = new DeleteTransactionUseCase(
      inMemoryTransactionsRepository,
      inMemoryBudgetsRepository,
    )
  })

  it('should be able to delete a transaction', async () => {
    const newTransaction = makeTransaction(
      {
        budgetId: new UniqueEntityID('budget-01'),
      },
      new UniqueEntityID('transaction-01'),
    )
    const newBudget = makeBudget(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )

    await inMemoryBudgetsRepository.create(newBudget)

    await inMemoryTransactionsRepository.create(newTransaction)

    await sut.execute({
      ownerId: 'user-01',
      transactionId: 'transaction-01',
      budgetId: 'budget-01',
    })

    expect(inMemoryTransactionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a transaction if you are not the owner', async () => {
    const newTransaction = makeTransaction(
      {
        budgetId: new UniqueEntityID('budget-01'),
      },
      new UniqueEntityID('transaction-01'),
    )
    const newBudget = makeBudget(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )

    await inMemoryBudgetsRepository.create(newBudget)

    await inMemoryTransactionsRepository.create(newTransaction)

    expect(() => {
      return sut.execute({
        ownerId: 'user-02',
        transactionId: 'transaction-01',
        budgetId: 'budget-01',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
