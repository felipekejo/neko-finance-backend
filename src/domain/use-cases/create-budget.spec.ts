import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { CreateBudgetUseCase } from './create-budget'

let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: CreateBudgetUseCase

describe('Create Budget Use Case', () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new CreateBudgetUseCase(inMemoryBudgetsRepository)
  })

  it('should be able to create a new budget', async () => {
    const { budget } = await sut.execute({
      name: 'New Budget',
      ownerId: 'user-01',
    })

    expect(budget.id).toBeTruthy()
    expect(inMemoryBudgetsRepository.items[0].id).toEqual(budget.id)
  })
})
