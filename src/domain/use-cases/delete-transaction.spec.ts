import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'
import { DeleteTransactionUseCase } from './delete-transaction'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: DeleteTransactionUseCase

describe('Delete Transaction Use Case', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(inMemoryTransactionsRepository)
  })

  it('should be able to delete a transaction', async () => {
    const newTransaction = makeTransaction(
      {
        budgetId: new UniqueEntityID('budget-01'),
      },
      new UniqueEntityID('transaction-01'),
    )
    await inMemoryTransactionsRepository.create(newTransaction)

    await sut.execute({
      transactionId: 'transaction-01',
      budgetId: 'budget-01',
    })

    expect(inMemoryTransactionsRepository.items).toHaveLength(0)
  })
})
