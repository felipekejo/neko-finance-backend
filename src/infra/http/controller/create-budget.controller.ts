import { CreateBudgetUseCase } from '@/domain/use-cases/create-budget'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createBudgetBodySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createBudgetBodySchema)
type CreateBudgetBodySchema = z.infer<typeof createBudgetBodySchema>

@Controller('/budgets')
export class CreateBudgetController {
  constructor(private createBudget: CreateBudgetUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateBudgetBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name } = body
    const { sub: ownerId } = user

    await this.createBudget.execute({
      name,
      ownerId,
    })
  }
}
