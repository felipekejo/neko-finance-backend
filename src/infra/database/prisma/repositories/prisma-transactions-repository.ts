import { PaginationParams } from '@/core/repositories/pagination-params'
import { Transaction } from '@/domain/entities/transaction'
import { TransactionFilters, TransactionsRepository } from '@/domain/repositories/transaction-repository'
import { Injectable } from '@nestjs/common'
import { PrismaTransactionsMapper } from '../mappers/prisma-transactions-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}
  async findMany(filters: TransactionFilters, { page, perPage = 10 }: PaginationParams): Promise<Transaction[]> {
    const where: any = {}
  
    if (filters.accountId) where.accountId = filters.accountId
    if (filters.categoryId) where.categoryId = filters.categoryId
    if (filters.budgetId) where.budgetId = filters.budgetId
    if (filters.type) where.type = filters.type
    if (filters.date) where.date = filters.date
  
    if (filters.year) {
      where.date = { ...(where.date || {}), gte: new Date(filters.year, 0, 1), lte: new Date(filters.year, 11, 31) }
    }
  
    if (filters.month && filters.year) {
      const start = new Date(filters.year, filters.month - 1, 1)
      const end = new Date(filters.year, filters.month, 0)
      where.date = { gte: start, lte: end }
    }
  
    const transactions = await this.prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        Category: {
          include: {
            subcategories: {
              select: {
                name: true,
              },
            },
          },
        },
      }
    })
  
    return transactions.map(PrismaTransactionsMapper.toDomain)
  }

  async create(transaction: Transaction) {
    const data = PrismaTransactionsMapper.toPrisma(transaction)

    await this.prisma.transaction.create({
      data,
    })
  }

  async delete(transaction: Transaction) {
    const data = PrismaTransactionsMapper.toPrisma(transaction)

    await this.prisma.transaction.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        Category: {
          include: {
            subcategories: {
              select: {
                name: true,
              },
            },
          },
        },
      }
    })

    if (!transaction) {
      return null
    }

    return PrismaTransactionsMapper.toDomain(transaction)
  }

  async sumAmountBy(filters: TransactionFilters): Promise<number> {
    const where: any = {}
  
    if (filters.accountId) where.accountId = filters.accountId
    if (filters.categoryId) where.categoryId = filters.categoryId
    if (filters.type) where.type = filters.type
  
    if (filters.year) {
      where.date = { gte: new Date(filters.year, 0, 1), lte: new Date(filters.year, 11, 31) }
    }
  
    if (filters.month && filters.year) {
      const start = new Date(filters.year, filters.month - 1, 1)
      const end = new Date(filters.year, filters.month, 0)
      where.date = { gte: start, lte: end }
    }
  
    const result = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where,
    })
  
    return result._sum.amount || 0
  }

  async save(transaction: Transaction) {
    const data = PrismaTransactionsMapper.toPrisma(transaction)
    await this.prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
