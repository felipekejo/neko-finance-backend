import { CreateCategoryUseCase } from '@/domain/use-cases/create-category'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createCategoryBodySchema = z.object({
  name: z.string(),
  budgetId: z.string(),
  type: z.enum(['INCOMES', 'EXPENSES']),
})

const bodyValidationPipe = new ZodValidationPipe(createCategoryBodySchema)
type CreateCategoryBodySchema = z.infer<typeof createCategoryBodySchema>

@ApiTags('Categories')
@Controller('/categories')
export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateCategoryBodySchema,
    // @CurrentUser() user: UserPayload,
  ) {
    const { name, budgetId, type } = body
    // const { sub: ownerId } = user
    const result = await this.createCategory.execute({
      name,
      type,
      budgetId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
