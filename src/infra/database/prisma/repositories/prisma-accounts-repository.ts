import { Account } from '@/domain/entities/account'
import { AccountsRepository } from '@/domain/repositories/account-repository'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaAccountMapper } from '../mappers/prisma-accounts-mapper'

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(account: Account) {
    const data = PrismaAccountMapper.toPrisma(account)

    await this.prisma.account.create({
      data,
    })
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

  async delete(account: Account) {
    const data = PrismaAccountMapper.toPrisma(account)
    await this.prisma.account.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(account: Account) {
    const data = PrismaAccountMapper.toPrisma(account)

    await this.prisma.account.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
