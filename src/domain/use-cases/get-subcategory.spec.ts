
import { makeSubcategory } from "test/factories/make-subcategory";
import { InMemorySubcategoriesRepository } from "test/repositories/in-memory-subcategories-repository";
import { GetSubcategoryByIdUseCase } from "./get-subcategory";

let inMemorySubcategoriesRepository:InMemorySubcategoriesRepository
let sut: GetSubcategoryByIdUseCase
describe('Get Subcategory by Id Use Case', () => {
  beforeEach(()=>{
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository()
    sut = new GetSubcategoryByIdUseCase(inMemorySubcategoriesRepository)
  })

  it('should be able to get an subcategory by id', async()=>{
    const newSubcategory = makeSubcategory()
    await inMemorySubcategoriesRepository.create(newSubcategory)

    const {subcategory}= await sut.execute({
      id:newSubcategory.id.toValue()
    })

    expect(subcategory.id).toBeTruthy()
    expect(subcategory.name).toEqual(newSubcategory.name)

  })

})

