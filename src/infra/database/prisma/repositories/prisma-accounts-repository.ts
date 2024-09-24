import { Account } from '@/domain/entities/account'
import { AccountsRepository } from '@/domain/repositories/account-repository'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaAccountMapper } from '../mappers/prisma-accounts-mapper'

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Account) {
    const account = await this.prisma.account.create({
      data: {
        name: data.name,
        budgetId: data.budgetId.toString(),
        balance: data.balance,
        ownerId: data.ownerId.toString(),
      },
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

    return PrismaAccountMapper.toDomain(account)
  }
}
