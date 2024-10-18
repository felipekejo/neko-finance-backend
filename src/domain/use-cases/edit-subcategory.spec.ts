import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeSubcategory } from 'test/factories/make-subcategory'
import { makeUserBudget } from 'test/factories/make-user-budget'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemorySubcategoriesRepository } from 'test/repositories/in-memory-subcategories-repository'
import { InMemoryUserBudgetRepository } from 'test/repositories/in-memory-user-budget-repository'
import { EditSubcategoryUseCase } from './edit-subcategory'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository
let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let inMemoryUserBudgetRepository: InMemoryUserBudgetRepository
let sut: EditSubcategoryUseCase

describe('Edit Subcategory Use Case', () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()
    inMemoryUserBudgetRepository = new InMemoryUserBudgetRepository()
    sut = new EditSubcategoryUseCase(
      inMemorySubcategoriesRepository,
      inMemoryBudgetsRepository,
      inMemoryUserBudgetRepository,
    )
  })

  it('should be able to edit a subcategory', async () => {
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

    await inMemorySubcategoriesRepository.create(newSubcategory)
    await inMemoryBudgetsRepository.create(newBudget)
    inMemoryUserBudgetRepository.items.push(userBudget)
    await sut.execute({
      subcategoryId: 'subcategory-01',

      name: 'new subcategory',
      budgetId: 'budget-01',
      userId: 'user-01',
    })

    expect(inMemorySubcategoriesRepository.items[0]).toMatchObject({
      name: 'new subcategory',
    })
  })

  it('should not be able to edit a account if you are not the owner', async () => {
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

    await inMemorySubcategoriesRepository.create(newSubcategory)
    await inMemoryBudgetsRepository.create(newBudget)
    inMemoryUserBudgetRepository.items.push(userBudget)
    const result = await sut.execute({
      subcategoryId: 'subcategory-01',
      name: 'new subcategory',
      budgetId: 'budget-01',
      userId: 'user-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
