import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCategory } from 'test/factories/make-category'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category-repository'
import { EditCategoryUseCase } from './edit-category'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: EditCategoryUseCase

describe('Edit Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()

    sut = new EditCategoryUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to edit a category', async () => {
    const newCategory = makeCategory(
      {
        budgetId: new UniqueEntityID('budget-01'),
        type: 'EXPENSES',
      },
      new UniqueEntityID('category-01'),
    )

    await inMemoryCategoriesRepository.create(newCategory)
    console.log(inMemoryCategoriesRepository.items)
    await sut.execute({
      categoryId: 'category-01',
      type: 'INCOMES',
      name: 'new category',
      budgetId: 'budget-01',
    })

    expect(inMemoryCategoriesRepository.items[0]).toMatchObject({
      type: 'INCOMES',
      name: 'new category',
    })
  })

  it('should not be able to edit a account if you do not have budget id', async () => {
    const newCategory = makeCategory(
      {
        budgetId: new UniqueEntityID('budget-01'),
        type: 'EXPENSES',
      },
      new UniqueEntityID('category-01'),
    )

    await inMemoryCategoriesRepository.create(newCategory)

    expect(() => {
      return sut.execute({
        categoryId: 'category-01',
        type: 'INCOMES',
        name: 'new category',
        budgetId: 'budget-02',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
