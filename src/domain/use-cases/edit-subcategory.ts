import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { BudgetsRepository } from '../repositories/budget-repository'
import { SubcategoriesRepository } from '../repositories/subcategory-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface EditSubcategoryUseCaseRequest {
  subcategoryId: string
  budgetId: string
  name: string
  ownerId: string
}

type EditSubcategoryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {}
>

@Injectable()
export class EditSubcategoryUseCase {
  constructor(
    private subcategoriesRepository: SubcategoriesRepository,
    private budgetsRepository: BudgetsRepository,
  ) {}

  async execute({
    subcategoryId,
    budgetId,
    name,
    ownerId,
  }: EditSubcategoryUseCaseRequest): Promise<EditSubcategoryUseCaseResponse> {
    const subcategory =
      await this.subcategoriesRepository.findById(subcategoryId)

    const budget = await this.budgetsRepository.findById(budgetId)

    if (!subcategory) {
      return left(new ResourceNotFoundError())
    }
    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (budget.ownerId.toString() !== ownerId) {
      return left(new UnauthorizedError())
    }

    subcategory.name = name

    await this.subcategoriesRepository.save(subcategory)
    return right({})
  }
}
