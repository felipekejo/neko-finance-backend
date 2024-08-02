import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/infra/auth/jwt-auth.guard'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

@Controller('/budgets')
@UseGuards(JwtAuthGuard)
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
