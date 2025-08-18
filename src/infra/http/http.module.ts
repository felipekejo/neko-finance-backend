import { Module } from '@nestjs/common'

import { AssignBudgetUseCase } from '@/domain/use-cases/assign-budget'
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate'
import { CreateAccountUseCase } from '@/domain/use-cases/create-account'
import { CreateBudgetUseCase } from '@/domain/use-cases/create-budget'
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category'
import { CreateSubcategoryUseCase } from '@/domain/use-cases/create-subcategory'
import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { CreateUserUseCase } from '@/domain/use-cases/create-user'
import { DeleteAccountUseCase } from '@/domain/use-cases/delete-account'
import { DeleteBudgetUseCase } from '@/domain/use-cases/delete-budget'
import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category'
import { DeleteSubcategoryUseCase } from '@/domain/use-cases/delete-subcategory'
import { DeleteTransactionUseCase } from '@/domain/use-cases/delete-transaction'
import { EditAccountUseCase } from '@/domain/use-cases/edit-account'
import { EditCategoryUseCase } from '@/domain/use-cases/edit-category'
import { EditSubcategoryUseCase } from '@/domain/use-cases/edit-subcategory'
import { EditTransactionUseCase } from '@/domain/use-cases/edit-transaction'
import { FetchAccountsUseCase } from '@/domain/use-cases/fetch-accounts'
import { FetchCategoriesUseCase } from '@/domain/use-cases/fetch-categories'
import { FetchSubcategoriesUseCase } from '@/domain/use-cases/fetch-subcategories'
import { GetAccountByIdUseCase } from '@/domain/use-cases/get-account-by-id'
import { GetBudgetByIdUseCase } from '@/domain/use-cases/get-budget-by-id'
import { GetCategoryByIdUseCase } from '@/domain/use-cases/get-category-by-id'
import { GetSubcategoryByIdUseCase } from '@/domain/use-cases/get-subcategory-by-id'
import { GetTransactionByIdUseCase } from '@/domain/use-cases/get-transaction-by-id'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controller/authenticate.controller'
import { CreateAccountController } from './controller/create-account.controller'
import { CreateBudgetController } from './controller/create-budget.controller'
import { CreateCategoryController } from './controller/create-category.controller'
import { CreateSubcategoryController } from './controller/create-subcategory.controller'
import { CreateTransactionController } from './controller/create-transaction.controller'
import { CreateUserController } from './controller/create-user.controller'
import { EditTransactionController } from './controller/edit-transaction.controller'
import { FetchAccountsController } from './controller/fetch-accounts.controller'
import { GetBudgetByIdController } from './controller/get-budget-by-id.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateBudgetController,
    GetBudgetByIdController,
    CreateAccountController,
    CreateTransactionController,
    CreateCategoryController,
    FetchAccountsController,
    EditTransactionController,
    CreateSubcategoryController
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    CreateBudgetUseCase,
    CreateAccountUseCase,
    CreateTransactionUseCase,
    CreateCategoryUseCase,
    CreateSubcategoryUseCase,
    GetBudgetByIdUseCase,
    AssignBudgetUseCase,
    DeleteAccountUseCase,
    DeleteBudgetUseCase,
    DeleteTransactionUseCase,
    DeleteCategoryUseCase,
    DeleteSubcategoryUseCase,
    EditAccountUseCase,
    EditCategoryUseCase,
    EditSubcategoryUseCase,
    EditTransactionUseCase,
    FetchAccountsUseCase,
    FetchCategoriesUseCase,
    FetchSubcategoriesUseCase,
    GetAccountByIdUseCase,
    GetCategoryByIdUseCase,
    GetSubcategoryByIdUseCase,
    GetTransactionByIdUseCase
  ],
})
export class HttpModule {}
