import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCategory } from 'test/factories/make-category'
import { inMemorySubcategoriesRepository } from 'test/repositories/in-memory-category-repository'
import { InMemorySubcategoriesRepository } from 'test/repositories/in-memory-subcategories-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { FetchSubcategoriesUseCase } from './fetch-subcategories'

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository
let sut: FetchSubcategoriesUseCase
describe('Fetch Subcategories Use Case', () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    sut = new FetchSubcategoriesUseCase(inMemorySubcategoriesRepository)
  })
  it('should return categories sorted by createdAt in descending order', async () => {
    const category1 = makeCategory({ createdAt: new Date('2023-01-01'), budgetId: new UniqueEntityID('budget-01') })
    const category2 = makeCategory({ createdAt: new Date('2023-02-01'), budgetId: new UniqueEntityID('budget-01') })
    await inMemorySubcategoriesRepository.create(category1)
    await inMemorySubcategoriesRepository.create(category2)

    const result = await sut.execute({
      budgetId: 'budget-01',
    })
    expect(result.isRight()).toBe(true)
    expect(result.value?.categories).toEqual([category1, category2])
  })
  it('should be able to get categories by budgetId', async () => {
    const newCategory = makeCategory(
      { budgetId: new UniqueEntityID('budget-test') },
      new UniqueEntityID('category-01')
    )
    await inMemorySubcategoriesRepository.create(newCategory)

    const result = await sut.execute({
      budgetId: 'budget-test',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.categories).toContainEqual(newCategory)
  })
})
  it('should return ResourceNotFoundError if no categories are found for the budgetId', async () => {
    const result = await sut.execute({
      budgetId: 'non-existing-budget-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

