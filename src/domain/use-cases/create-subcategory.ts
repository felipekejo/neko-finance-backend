
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Subcategory } from '../entities/subcategory'
import { SubcategoryService } from '../service/subcategory.service'

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
  constructor(private subcategoryService: SubcategoryService) {}

  async execute({
    name,
    categoryId,
  }: CreateSubcategoryUseCaseRequest): Promise<CreateSubcategoryUseCaseResponse> {
    const result = await this.subcategoryService.create({
      name,
      categoryId,
    })

   if (result.isLeft()) {
      return result 
    }

    return right({ subcategory: result.value.subcategory })
  }
}
