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
    PrismaAccountsRepository,
    PrismaBudgetsRepository,
    PrismaCategoryRepository,
    PrismaUsersRepository,
    PrismaTransactionsRepository,
    PrismaSubcategoriesRepository,
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
