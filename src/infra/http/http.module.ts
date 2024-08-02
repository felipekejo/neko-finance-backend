import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { AuthenticateController } from './controller/authenticate.controller'
import { CreateBudgetController } from './controller/create-budget.controller'
import { CreateUserController } from './controller/create-user.controller'
import { FetchBudgetController } from './controller/fetch-budget.controller'

@Module({
  imports: [],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateBudgetController,
    FetchBudgetController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
