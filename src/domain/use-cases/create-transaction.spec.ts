import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'
import { CreateTransactionUseCase } from './create-transaction'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
    inMemoryAccountsRepository = new InMemoryAccountsRepository()

    sut = new CreateTransactionUseCase(
      inMemoryTransactionsRepository,
      inMemoryAccountsRepository,
    )
  })

  it('should be able to create a new account', async () => {
    const { transaction } = await sut.execute({
      description: 'New transaction',
      accountId: 'account-01',
      budgetId: 'budget-01',
      type: 'INCOMES',
      amount: 100,
    })

    expect(transaction.id).toBeTruthy()
    expect(inMemoryTransactionsRepository.items[0].id).toEqual(transaction.id)
  })

  it('should be able to increase the account balance', async () => {
    const newAccount = makeAccount(
      {
        ownerId: new UniqueEntityID('user-01'),
        balance: 0,
      },
      new UniqueEntityID('account-01'),
    )
    await inMemoryAccountsRepository.create(newAccount)
    await sut.execute({
      description: 'New transaction',
      accountId: 'account-01',
      budgetId: 'budget-01',
      type: 'INCOMES',
      amount: 100,
    })

    expect(inMemoryAccountsRepository.items[0].balance).toEqual(100)
  })

  it('should be able to decrease the account balance', async () => {
    const newAccount = makeAccount(
      {
        ownerId: new UniqueEntityID('user-01'),
        balance: 200,
      },
      new UniqueEntityID('account-01'),
    )
    await inMemoryAccountsRepository.create(newAccount)
    await sut.execute({
      description: 'New transaction',
      accountId: 'account-01',
      budgetId: 'budget-01',
      type: 'EXPENSES',
      amount: 100,
    })

    expect(inMemoryAccountsRepository.items[0].balance).toEqual(100)
  })
})
