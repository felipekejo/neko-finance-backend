import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { Budget } from '../entities/budget'
import { GetBudgetByIdUseCase } from './get-budget-by-id'

let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: GetBudgetByIdUseCase

describe('Create Budget Use Case', () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new GetBudgetByIdUseCase(inMemoryBudgetsRepository)
  })

  it('should be able to get a budget by id', async () => {
    const newBudget = Budget.create({
      name: 'New Budget',
      ownerId: new UniqueEntityID(),
    })
    console.log(newBudget.id.toString())
    const { budget } = await sut.execute({
      id: newBudget.id.toString(),
    })
    console.log(budget)
    expect(budget.id).toBeTruthy()
  })
})
