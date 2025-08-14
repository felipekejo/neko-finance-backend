import { left, right, type Either } from "@/core/either";
import { Injectable } from "@nestjs/common";
import type { Category } from "../entities/category";
import { CategoriesRepository } from "../repositories/category-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchCategoriesUseCaseRequest {
  budgetId: string;
}
type FetchCategoriesUseCaseResponse = Either<ResourceNotFoundError, {
  categories: Category[]
}>;
@Injectable()
export class FetchCategoriesUseCase{
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute(
    request: FetchCategoriesUseCaseRequest
  ): Promise<FetchCategoriesUseCaseResponse> {
    const { budgetId } = request;

    const categories = await this.categoriesRepository.findMany({}, budgetId);

    if (categories.length === 0) {
      return left(new ResourceNotFoundError());
    }

    return right({ categories });
  }
}