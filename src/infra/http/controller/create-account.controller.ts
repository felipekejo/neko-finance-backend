import { CreateAccountUseCase } from '@/domain/use-cases/create-account'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  balance: z.number(),
  budgetId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: CreateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateAccountBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, balance, budgetId } = body
    const { sub: ownerId } = user

    const result = await this.createAccount.execute({
      name,
      ownerId,
      budgetId,
      balance,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
