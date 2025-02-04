import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { UserBudgetRepository } from '@/domain/repositories/user-budget-repository'
import { PrismaUserBudgetMapper } from '../mappers/prisma-user-budget-mapper'

@Injectable()
export class PrismaUserBudgetRepository implements UserBudgetRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserIdAndBudgetId(userId: string, budgetId: string){

    const userBudget = await this.prisma.userBudget.findFirst({
      where: {
        userId,
        budgetId
      }
    })

    if (!userBudget) {
      return null
    }

    return PrismaUserBudgetMapper.toDomain(userBudget)
  }

  
  


}
