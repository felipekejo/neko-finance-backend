import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { Subcategory } from "../entities/subcategory";
import { SubcategoriesRepository } from "../repositories/subcategory-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchSubcategoriesUseCaseRequest {
  categoryId: string;
}
type FetchSubcategoriesUseCaseResponse = Either<ResourceNotFoundError, {
  subcategories: Subcategory[]
}>;
@Injectable()
export class FetchSubcategoriesUseCase{
  constructor(private subcategories:SubcategoriesRepository){}

  async execute(
    {categoryId}:FetchSubcategoriesUseCaseRequest
  ):Promise<FetchSubcategoriesUseCaseResponse>{
    const subcategories = await this.subcategories.findMany(categoryId)

    if(subcategories.length === 0 ){
      return left(new ResourceNotFoundError())
    }
    return right({subcategories})
  }
}