import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { Subcategory } from "../entities/subcategory"
import { SubcategoriesRepository } from "../repositories/subcategory-repository"


interface CreateSubcategoryUseCaseRequest {
  name: string
  categoryId: string
}

interface CreateSubcategoryUseCaseResponse {
  subcategory: Subcategory
}

export class CreateSubcategoryUseCase {
  constructor(private subcategoriesRepository:SubcategoriesRepository){}

  async execute({ name, categoryId }: CreateSubcategoryUseCaseRequest):Promise<CreateSubcategoryUseCaseResponse> {
    const subcategory = Subcategory.create({
      name,
      categoryId:new UniqueEntityID(categoryId),
      
    })

    await this.subcategoriesRepository.create(subcategory)

    return { subcategory }
  }
}