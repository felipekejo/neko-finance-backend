import { Budget } from '../entities/budget'
import { BudgetsRepository } from '../repositories/budget-repository'
import { CreateBudgetUseCase } from './create-budget'

// let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: CreateBudgetUseCase

describe('Create Budget Use Case', () => {
  beforeEach(() => {
    const fakeBudgetsRepository: BudgetsRepository = {
      create: async (budget: Budget) => {},
    }
    // inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new CreateBudgetUseCase(fakeBudgetsRepository)
  })

  it('should be able to create a new budget', async () => {
    const budget = await sut.execute({
      name: 'New Budget',
      ownerId: 'user-01',
    })

    expect(budget.name).toEqual('New Budget')
  })
})
