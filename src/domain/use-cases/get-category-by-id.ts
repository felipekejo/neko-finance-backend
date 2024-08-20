import { Category } from '../entities/category'
import { CategoriesRepository } from '../repositories/category-repository'

interface GetCategoryByIdUseCaseRequest {
  id: string
}

interface GetCategoryByIdUseCaseResponse {
  category: Category
}

export class GetCategoryByIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
  }: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
    const category = await this.categoriesRepository.findById(id)
    if (!category) {
      throw new Error('Category not found')
    }
    return { category }
  }
}
