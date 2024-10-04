import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Category } from '../entities/category'
import { CategoriesRepository } from '../repositories/category-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetCategoryByIdUseCaseRequest {
  id: string
}

type GetCategoryByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    category: Category
  }
>

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
  }: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
    const category = await this.categoriesRepository.findById(id)
    if (!category) {
      return left(new ResourceNotFoundError())
    }
    return right({ category })
  }
}
