import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createTransactionBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  budgetId: z.string(),
  type: z.enum(['INCOMES', 'EXPENSES']),
  date: z.string().date(),
  accountId: z.string(),
  categoryId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createTransactionBodySchema)
type CreateTransactionBodySchema = z.infer<typeof createTransactionBodySchema>

@Controller('/transactions')
export class CreateTransactionController {
  constructor(private createTransaction: CreateTransactionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateTransactionBodySchema,
    // @CurrentUser() user: UserPayload,
  ) {
    const { description, accountId, amount, budgetId, date, type, categoryId } =
      body
    // const { sub: ownerId } = user

    const result = await this.createTransaction.execute({
      description,
      type,
      budgetId,
      amount,
      accountId,
      date,
      categoryId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
