import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Category } from '../entities/category'
import { CategoriesRepository } from '../repositories/category-repository'

type TypeTransaction = 'INCOMES' | 'EXPENSES'
interface CreateCategoryUseCaseRequest {
  name: string
  budgetId: string
  type: TypeTransaction
}

type CreateCategoryUseCaseResponse = Either<
  null,
  {
    category: Category
  }
>

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
    budgetId,
    type,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const category = Category.create({
      name,
      budgetId: new UniqueEntityID(budgetId),
      type,
    })
    console.log(category)
    await this.categoriesRepository.create(category)

    return right({ category })
  }
}
