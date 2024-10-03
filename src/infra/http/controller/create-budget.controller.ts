import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createBudgetBodySchema = z.object({
  name: z.string(),
})
const bodyValidationPipe = new ZodValidationPipe(createBudgetBodySchema)
type CreateBudgetBodySchema = z.infer<typeof createBudgetBodySchema>

@Controller('/budgets')
export class CreateBudgetController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes()
  async handle(
    @Body(bodyValidationPipe) body: CreateBudgetBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name } = body
    const { sub: ownerId } = user

    await this.prisma.budget.create({
      data: {
        name,
        ownerId,
      },
    })
  }
}
