import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { DeleteBudgetUseCase } from './delete-budget'

let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: DeleteBudgetUseCase

describe('Delete Budget Use Case', () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new DeleteBudgetUseCase(inMemoryBudgetsRepository)
  })

  it('should be able to delete a budget', async () => {
    const newBudget = makeBudget({
      ownerId: new UniqueEntityID('user-01'),
    },new UniqueEntityID('budget-01'))

    await inMemoryBudgetsRepository.create(newBudget)

    await sut.execute({
      budgetId: 'budget-01',
      ownerId: 'user-01',
    })

  
    expect(inMemoryBudgetsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a budget if you are not the owner', async () => {
    const newBudget = makeBudget({
      ownerId: new UniqueEntityID('user-01'),
    },new UniqueEntityID('budget-01'))

    await inMemoryBudgetsRepository.create(newBudget)

    

  
    expect(()=>{
      return sut.execute({
        budgetId: 'budget-01',
        ownerId: 'user-02',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
