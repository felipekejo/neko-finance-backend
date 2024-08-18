import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository"
import { CreateTransactionUseCase } from "./create-transaction"



let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    sut = new CreateTransactionUseCase(inMemoryTransactionsRepository)
  })

  it('should be able to create a new account', async () => {
    const { transaction } = await sut.execute({
      description: 'New transaction',
      accountId: 'account-01',
      budgetId: 'budget-01',
      amount: 100
    })

    expect(transaction.id).toBeTruthy()
    expect(inMemoryTransactionsRepository.items[0].id).toEqual(transaction.id)
  })
})
