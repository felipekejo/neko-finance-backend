import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeUserBudget } from 'test/factories/make-user-budget'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { DeleteBudgetUseCase } from './delete-budget'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemoryBudgetsRepository: InMemoryBudgetsRepository

let sut: DeleteBudgetUseCase

describe('Delete Budget Use Case', () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new DeleteBudgetUseCase(inMemoryBudgetsRepository)
  })

  it('should be able to delete a budget', async () => {
    const newBudget = makeBudget(
      {
        name: 'New Budget',
      },
      new UniqueEntityID('budget-01'),
    )
    const userBudget = makeUserBudget(
      {
        userId: new UniqueEntityID('user-01'),
        budgetId: new UniqueEntityID('budget-01'),
      },
      new UniqueEntityID('user-budget-01'),
    )

    await inMemoryBudgetsRepository.create(newBudget)
    await inMemoryUserBudgetRepository.create(userBudget)

    await sut.execute({
      budgetId: 'budget-01',
      userId: 'user-01',
    })

    expect(inMemoryBudgetsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a budget if you are not the owner', async () => {
    const newBudget = makeBudget(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )

    await inMemoryBudgetsRepository.create(newBudget)

    const result = await sut.execute({
      budgetId: 'budget-01',
      ownerId: 'user-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
