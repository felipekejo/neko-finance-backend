import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate'
import { CreateUserUseCase } from '@/domain/use-cases/create-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controller/authenticate.controller'
import { CreateBudgetController } from './controller/create-budget.controller'
import { CreateUserController } from './controller/create-user.controller'
import { FetchBudgetController } from './controller/fetch-budget.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateBudgetController,
    FetchBudgetController,
  ],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
