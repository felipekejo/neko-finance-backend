import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeSubcategory } from 'test/factories/make-subcategory'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemorySubcategoriesRepository } from 'test/repositories/in-memory-subcategories-repository'
import { DeleteSubcategoryUseCase } from './delete-subcategory'

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository
let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: DeleteSubcategoryUseCase

describe('Delete Subcategory Use Case', () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new DeleteSubcategoryUseCase(
      inMemorySubcategoriesRepository,
      inMemoryBudgetsRepository,
    )
  })

  it('should be able to delete a subcategory', async () => {
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
    await inMemoryBudgetsRepository.create(newBudget)
    await inMemorySubcategoriesRepository.create(newSubcategory)

    await sut.execute({
      subcategoryId: 'subcategory-01',
      ownerId: 'user-01',
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
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )
    await inMemoryBudgetsRepository.create(newBudget)
    await inMemorySubcategoriesRepository.create(newSubcategory)

    expect(() => {
      return sut.execute({
        subcategoryId: 'subcategory-01',
        ownerId: 'user-02',
        budgetId: 'budget-01',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
