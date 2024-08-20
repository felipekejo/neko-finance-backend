import { makeCategory } from 'test/factories/make-category'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category-repository'
import { GetCategoryByIdUseCase } from './get-category-by-id'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: GetCategoryByIdUseCase
describe('Get Account by Id Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetCategoryByIdUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to get an account by id', async () => {
    const newCategory = makeCategory()
    await inMemoryCategoriesRepository.create(newCategory)

    const { category } = await sut.execute({
      id: newCategory.id.toValue(),
    })

    expect(category.id).toBeTruthy()
    expect(category.name).toEqual(newCategory.name)
  })
})
