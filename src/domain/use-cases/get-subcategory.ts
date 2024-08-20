import { Subcategory } from '../entities/subcategory'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'

interface GetSubcategoryByIdUseCaseRequest {
  id: string
}

interface GetSubcategoryByIdUseCaseResponse {
  subcategory: Subcategory
}

export class GetSubcategoryByIdUseCase {
  constructor(private subcategoriesRepository: SubcategoriesRepository) {}

  async execute({
    id,
  }: GetSubcategoryByIdUseCaseRequest): Promise<GetSubcategoryByIdUseCaseResponse> {
    const subcategory = await this.subcategoriesRepository.findById(id)
    if (!subcategory) {
      throw new Error('Subcategory not found')
    }
    return { subcategory }
  }
}
