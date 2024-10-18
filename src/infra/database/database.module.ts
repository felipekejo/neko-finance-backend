import { AccountsRepository } from '@/domain/repositories/account-repository'
import { BudgetsRepository } from '@/domain/repositories/budget-repository'
import { CategoriesRepository } from '@/domain/repositories/category-repository'
import { SubcategoriesRepository } from '@/domain/repositories/subcategory-repository'
import { TransactionsRepository } from '@/domain/repositories/transaction-repository'
import { UsersRepository } from '@/domain/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'
import { PrismaBudgetsRepository } from './prisma/repositories/prisma-budgets-repository'
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository'
import { PrismaSubcategoriesRepository } from './prisma/repositories/prisma-subcategory-repository'
import { PrismaTransactionsRepository } from './prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
    {
      provide: BudgetsRepository,
      useClass: PrismaBudgetsRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository,
    },
    {
      provide: SubcategoriesRepository,
      useClass: PrismaSubcategoriesRepository,
    },
  ],
  exports: [
    PrismaService,
    AccountsRepository,
    UsersRepository,
    BudgetsRepository,
    CategoriesRepository,
    TransactionsRepository,
    SubcategoriesRepository,
  ],
})
export class DatabaseModule {}
