import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate'
import { CreateAccountUseCase } from '@/domain/use-cases/create-account'
import { CreateBudgetUseCase } from '@/domain/use-cases/create-budget'
import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { CreateUserUseCase } from '@/domain/use-cases/create-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controller/authenticate.controller'
import { CreateAccountController } from './controller/create-account.controller'
import { CreateBudgetController } from './controller/create-budget.controller'
import { CreateTransactionController } from './controller/create-transaction.controller'
import { CreateUserController } from './controller/create-user.controller'
import { FetchBudgetController } from './controller/fetch-budget.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateBudgetController,
    FetchBudgetController,
    CreateAccountController,
    CreateTransactionController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    CreateBudgetUseCase,
    CreateAccountUseCase,
    CreateTransactionUseCase,
  ],
})
export class HttpModule {}
