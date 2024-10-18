import { GetBudgetByIdUseCase } from '@/domain/use-cases/get-budget-by-id'
import { Controller, Get, Param } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

@Controller('/budgets/:budgetId')
export class FetchBudgetController {
  constructor(private fetchBudget: GetBudgetByIdUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('budgetId') budgetId: string,
  ) {
    const budgets = await this.fetchBudget.execute({
      userId: user.sub,
      budgetId,
    })
    return { budgets }
  }
}
