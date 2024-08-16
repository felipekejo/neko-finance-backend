import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { EditAccountUseCase } from './edit-account'



let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: EditAccountUseCase

describe('Edit Account Use Case', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()

    sut = new EditAccountUseCase(inMemoryAccountsRepository)
  })

  it('should be able to edit a account', async () => {
    const newAccount = makeAccount({
      ownerId: new UniqueEntityID('user-01'),
    },new UniqueEntityID('account-01'))

    await inMemoryAccountsRepository.create(newAccount)

    await sut.execute({
      accountId: 'account-01',
      ownerId: 'user-01',
      name: 'new name',
      balance: 1000
    })

  
    expect(inMemoryAccountsRepository.items[0]).toMatchObject({
      name: 'new name',
      balance: 1000
    })
  })

  it('should not be able to edit a account if you are not the owner', async () => {
    const newAccount = makeAccount({
      ownerId: new UniqueEntityID('user-01'),
    },new UniqueEntityID('account-01'))

    await inMemoryAccountsRepository.create(newAccount)

    expect(()=>{
      return sut.execute({
        accountId: 'account-01',
        ownerId: 'user-02',
        name: 'new name',
        balance: 1000
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
