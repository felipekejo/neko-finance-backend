import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemoryUserBudgetRepository } from 'test/repositories/in-memory-user-budget-repository'
import { CreateBudgetUseCase } from './create-budget'

let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let inMemoryUserBudgetRepository: InMemoryUserBudgetRepository
let sut: CreateBudgetUseCase

describe('Create Budget Use Case', () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new CreateBudgetUseCase(
      inMemoryBudgetsRepository,
      inMemoryUserBudgetRepository,
    )
  })

  it('should be able to create a new budget', async () => {
    const result = await sut.execute({
      name: 'New Budget',
      ownerId: 'user-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBudgetsRepository.items[0].id).toEqual(
      result.value?.budget.id,
    )
  })
})
