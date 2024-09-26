// import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'

// import { makeTransaction } from 'test/factories/make-transaction'
// import { ListRecentTransactionsUseCase } from './list-recent-transactions'

// let inMemoryTransactionsRepository: InMemoryTransactionsRepository
// let sut: ListRecentTransactionsUseCase
// describe('List Recent Transactions Use Case', () => {
//   beforeEach(() => {
//     inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
//     sut = new ListRecentTransactionsUseCase(inMemoryTransactionsRepository)
//   })

//   it('should be able to list recent transactions', async () => {
//     await inMemoryTransactionsRepository.create(
//       makeTransaction({ createdAt: new Date('2021-01-01') }),
//     )
//     await inMemoryTransactionsRepository.create(
//       makeTransaction({ createdAt: new Date('2021-01-02') }),
//     )
//     await inMemoryTransactionsRepository.create(
//       makeTransaction({ createdAt: new Date('2021-01-03') }),
//     )

//     const result = await sut.execute({ page: 1 })

//     expect(result.value?.transactions).toEqual([
//       expect.objectContaining({ createdAt: new Date('2021-01-03') }),
//       expect.objectContaining({ createdAt: new Date('2021-01-02') }),
//       expect.objectContaining({ createdAt: new Date('2021-01-01') }),
//     ])
//   })

//   it('should be able to list paginated recent transactions', async () => {
//     for (let i = 0; i < 22; i++) {
//       await inMemoryTransactionsRepository.create(makeTransaction())
//     }

//     const result = await sut.execute({ page: 2 })
//     console.log(result)
//     expect(result.value?.transactions).toHaveLength(2)
//   })
// })
