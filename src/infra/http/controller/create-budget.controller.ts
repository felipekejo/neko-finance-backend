import { CreateBudgetUseCase } from '@/domain/use-cases/create-budget'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createBudgetBodySchema = z.object({
  name: z.string(),
})

type CreateBudgetBodySchema = z.infer<typeof createBudgetBodySchema>

@Controller('/budgets')
export class CreateBudgetController {
  constructor(private createBudget: CreateBudgetUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createBudgetBodySchema))
  async handle(
    @Body() body: CreateBudgetBodySchema,
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
