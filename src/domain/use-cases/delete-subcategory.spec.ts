import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeSubcategory } from 'test/factories/make-subcategory'
import { makeUserBudget } from 'test/factories/make-user-budget'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemorySubcategoriesRepository } from 'test/repositories/in-memory-subcategories-repository'
import { InMemoryUserBudgetRepository } from 'test/repositories/in-memory-user-budget-repository'
import { DeleteSubcategoryUseCase } from './delete-subcategory'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository
let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let inMemoryUserBudgetRepository: InMemoryUserBudgetRepository
let sut: DeleteSubcategoryUseCase

describe('Delete Subcategory Use Case', () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()
    inMemoryUserBudgetRepository = new InMemoryUserBudgetRepository()

    sut = new DeleteSubcategoryUseCase(
      inMemorySubcategoriesRepository,
      inMemoryBudgetsRepository,
      inMemoryUserBudgetRepository,
    )
  })

  it('should be able to delete a subcategory', async () => {
    const newSubcategory = makeSubcategory(
      {},
      new UniqueEntityID('subcategory-01'),
    )

    const newBudget = makeBudget(
      {
        name: 'Budget 01',
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
    await inMemorySubcategoriesRepository.create(newSubcategory)
    inMemoryUserBudgetRepository.items.push(userBudget)

    await sut.execute({
      subcategoryId: 'subcategory-01',
      userId: 'user-01',
      budgetId: 'budget-01',
    })

    expect(inMemorySubcategoriesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a subcategory if you are not the owner', async () => {
    const newSubcategory = makeSubcategory(
      {},
      new UniqueEntityID('subcategory-01'),
    )

    const newBudget = makeBudget(
      {
        name: 'Budget 01',
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
    await inMemorySubcategoriesRepository.create(newSubcategory)
    inMemoryUserBudgetRepository.items.push(userBudget)
    const result = await sut.execute({
      subcategoryId: 'subcategory-01',
      userId: 'user-02',
      budgetId: 'budget-01',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
