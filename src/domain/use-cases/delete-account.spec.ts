import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { DeleteAccountUseCase } from './delete-account'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: DeleteAccountUseCase

describe('Delete Account Use Case', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()

    sut = new DeleteAccountUseCase(inMemoryAccountsRepository)
  })

  it('should be able to delete a account', async () => {
    const newAccount = makeAccount(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('account-01'),
    )

    await inMemoryAccountsRepository.create(newAccount)

    await sut.execute({
      accountId: 'account-01',
      ownerId: 'user-01',
    })

    expect(inMemoryAccountsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a account if you are not the owner', async () => {
    const newAccount = makeAccount(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('account-01'),
    )

    await inMemoryAccountsRepository.create(newAccount)

    expect(() => {
      return sut.execute({
        accountId: 'account-01',
        ownerId: 'user-02',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
