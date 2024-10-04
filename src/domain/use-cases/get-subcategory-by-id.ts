import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Subcategory } from '../entities/subcategory'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSubcategoryByIdUseCaseRequest {
  id: string
}

type GetSubcategoryByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    subcategory: Subcategory
  }
>

@Injectable()
export class GetSubcategoryByIdUseCase {
  constructor(private subcategoriesRepository: SubcategoriesRepository) {}

  async execute({
    id,
  }: GetSubcategoryByIdUseCaseRequest): Promise<GetSubcategoryByIdUseCaseResponse> {
    const subcategory = await this.subcategoriesRepository.findById(id)
    if (!subcategory) {
      return left(new ResourceNotFoundError())
    }
    return right({ subcategory })
  }
}
