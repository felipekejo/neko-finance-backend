import { Account, Prisma } from '@prisma/client'

export interface AccountsRepository {
  create(data: Prisma.AccountCreateManyInput): Promise<Account>
  findById(id: string): Promise<Account | null>
}
