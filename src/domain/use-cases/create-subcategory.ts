import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Subcategory } from '../entities/subcategory'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'

interface CreateSubcategoryUseCaseRequest {
  name: string
  categoryId: string
}

type CreateSubcategoryUseCaseResponse = Either<
  null,
  {
    subcategory: Subcategory
  }
>

@Injectable()
export class CreateSubcategoryUseCase {
  constructor(private subcategoriesRepository: SubcategoriesRepository) {}

  async execute({
    name,
    categoryId,
  }: CreateSubcategoryUseCaseRequest): Promise<CreateSubcategoryUseCaseResponse> {
    const subcategory = Subcategory.create({
      name,
      categoryId: new UniqueEntityID(categoryId),
    })

    await this.subcategoriesRepository.create(subcategory)

    return right({ subcategory })
  }
}
