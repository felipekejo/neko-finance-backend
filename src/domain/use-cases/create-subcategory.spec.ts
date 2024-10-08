import { InMemorySubcategoriesRepository } from 'test/repositories/in-memory-subcategories-repository'
import { CreateSubcategoryUseCase } from './create-subcategory'

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository
let sut: CreateSubcategoryUseCase

describe('Create Subcategory Use Case', () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    sut = new CreateSubcategoryUseCase(inMemorySubcategoriesRepository)
  })

  it('should be able to create a new category', async () => {
    const result = await sut.execute({
      name: 'new subcategory',
      categoryId: 'category-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySubcategoriesRepository.items[0]).toEqual(
      result.value?.subcategory,
    )
  })
})
