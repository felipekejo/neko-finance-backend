import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

@Controller('/budgets')
export class FetchBudgetController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const budgets = await this.prisma.budget.findFirst({
      where: {
        ownerId: user.sub,
      },
    })
    return { budgets }
  }
}
