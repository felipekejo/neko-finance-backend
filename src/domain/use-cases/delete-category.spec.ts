import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeBudget } from 'test/factories/make-budget'
import { makeCategory } from 'test/factories/make-category'
import { InMemoryBudgetsRepository } from 'test/repositories/in-memory-budgets-repository'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category-repository'
import { DeleteCategoryUseCase } from './delete-category'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryBudgetsRepository: InMemoryBudgetsRepository
let sut: DeleteCategoryUseCase

describe('Delete Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository()

    sut = new DeleteCategoryUseCase(
      inMemoryCategoriesRepository,
      inMemoryBudgetsRepository,
    )
  })

  it('should be able to delete a category', async () => {
    const newCategory = makeCategory(
      {
        budgetId: new UniqueEntityID('budget-01'),
      },
      new UniqueEntityID('category-01'),
    )

    const newBudget = makeBudget(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )
    await inMemoryBudgetsRepository.create(newBudget)
    await inMemoryCategoriesRepository.create(newCategory)

    await sut.execute({
      categoryId: 'category-01',
      ownerId: 'user-01',
      budgetId: 'budget-01',
    })

    expect(inMemoryCategoriesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a category if you are not the owner', async () => {
    const newCategory = makeCategory(
      {
        budgetId: new UniqueEntityID('budget-01'),
      },
      new UniqueEntityID('category-01'),
    )

    const newBudget = makeBudget(
      {
        ownerId: new UniqueEntityID('user-01'),
      },
      new UniqueEntityID('budget-01'),
    )
    await inMemoryBudgetsRepository.create(newBudget)
    await inMemoryCategoriesRepository.create(newCategory)

    expect(() => {
      return sut.execute({
        categoryId: 'category-01',
        ownerId: 'user-02',
        budgetId: 'budget-01',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
