import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category-repository'
import { CreateCategoryUseCase } from './create-category'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to create a new category', async () => {
    const { category } = await sut.execute({
      name: 'new category',
      budgetId: 'budget-01',
      type: 'INCOMES',
    })

    expect(category.id).toBeTruthy()
    expect(inMemoryCategoriesRepository.items[0].id).toEqual(category.id)
  })
})
