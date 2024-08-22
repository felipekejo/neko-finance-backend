import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeSubcategory } from 'test/factories/make-subcategory'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemorySubcategoriesRepository } from 'test/repositories/in-memory-subcategories-repository'
import { EditSubcategoryUseCase } from './edit-subcategory'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository
let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: EditSubcategoryUseCase

describe('Edit Subcategory Use Case', () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()
    sut = new EditSubcategoryUseCase(
      inMemorySubcategoriesRepository,
      inMemoryBudgetsRepository,
    )
  })

  it('should be able to edit a subcategory', async () => {
    const newSubcategory = makeSubcategory(
      {},
      new UniqueEntityID('subcategory-01'),
    )
    const newBudget = makeBudget(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )

    await inMemorySubcategoriesRepository.create(newSubcategory)
    await inMemoryBudgetsRepository.create(newBudget)
    await sut.execute({
      subcategoryId: 'subcategory-01',

      name: 'new subcategory',
      budgetId: 'budget-01',
      ownerId: 'user-01',
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
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )

    await inMemorySubcategoriesRepository.create(newSubcategory)
    await inMemoryBudgetsRepository.create(newBudget)

    const result = await sut.execute({
      subcategoryId: 'subcategory-01',
      name: 'new subcategory',
      budgetId: 'budget-01',
      ownerId: 'user-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
