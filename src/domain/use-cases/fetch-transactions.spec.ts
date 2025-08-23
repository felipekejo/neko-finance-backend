import { makeTransaction } from "test/factories/make-transaction"
import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository"
import { FetchTransactionsUseCase } from "./fetch-transactions"

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: FetchTransactionsUseCase
describe('Fetch Subcategories Use Case', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new FetchTransactionsUseCase(inMemoryTransactionsRepository)
  })
  it('should be able to bring all transactions in specific period',async ()=>{
        const transaction1= makeTransaction({
          createdAt: new Date('2025-08-22'),
          description:'transaction1'
        })
         const transaction2 = makeTransaction({
          createdAt: new Date('2025-07-22'),
          description:'transaction2'
        })
        await inMemoryTransactionsRepository.create(transaction1)
        await inMemoryTransactionsRepository.create(transaction2)

        const filters = {
          year:2025,
          month:8
        }
        const pagination =
          {page: 1, perPage: 10}
        const result = await sut.execute({
          filters,
          pagination
        })
          expect(result.isRight()).toBe(true)
        expect(result.value?.transactions).toContainEqual(transaction1)

  })
})