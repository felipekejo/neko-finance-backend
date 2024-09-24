import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/entities/account'
import { Account as PrismaAccount } from '@prisma/client'

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        name: raw.name,
        ownerId: new UniqueEntityID(raw.ownerId),
        balance: raw.balance,
        budgetId: new UniqueEntityID(raw.budgetId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
