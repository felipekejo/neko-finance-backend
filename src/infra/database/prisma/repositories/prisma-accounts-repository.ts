import { AccountsRepository } from '@/domain/repositories/account-repository'
import { Prisma, PrismaClient } from '@prisma/client'

export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: Prisma.AccountCreateManyInput) {
    const account = await this.prisma.account.create({
      data,
    })

    return account
  }

  async findById(id: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    })

    if (!account) {
      return null
    }

    return account
  }
}
