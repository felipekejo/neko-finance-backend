import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { BudgetsRepository } from '../repositories/budget-repository'
import { CategoriesRepository } from '../repositories/category-repository'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface EditSubcategoryUseCaseRequest {
  subcategoryId: string
  categoryId: string
  name: string
  budgetId: string
}

type EditSubcategoryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class EditSubcategoryUseCase {
  constructor(
    private subcategoriesRepository: SubcategoriesRepository,
    private categoriesRepository: CategoriesRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    subcategoryId,
    categoryId,
    name,
    budgetId
  }: EditSubcategoryUseCaseRequest): Promise<EditSubcategoryUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(budgetId)

    if (!budget) {
      return left(new UnauthorizedError())
    }

    const subcategory =
      await this.subcategoriesRepository.findById(subcategoryId)

    const category = await this.categoriesRepository.findById(categoryId)

    if (!subcategory) {
      return left(new ResourceNotFoundError())
    }
    if (!category) {
      return left(new ResourceNotFoundError())
    }

    subcategory.name = name

    await this.subcategoriesRepository.save(subcategory)
    return right({})
  }
}
