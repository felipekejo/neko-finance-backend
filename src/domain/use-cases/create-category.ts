import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Category } from "../entities/category"
import { CategoriesRepository } from "../repositories/category-repository"

type TypeTransaction = 'INCOMES' | 'EXPENSES'
interface CreateCategoryUseCaseRequest {
  name: string
  budgetId: string
  type: TypeTransaction
}

interface CreateCategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository:CategoriesRepository){}

  async execute({ name, budgetId, type }: CreateCategoryUseCaseRequest):Promise<CreateCategoryUseCaseResponse> {
    const category = Category.create({
      name,
      budgetId:new UniqueEntityID(budgetId),
      type
    })

    await this.categoriesRepository.create(category)

    return { category }
  }
}