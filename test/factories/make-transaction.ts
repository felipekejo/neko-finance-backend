import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction, TransactionProps } from '@/domain/entities/transaction'

import { faker } from '@faker-js/faker'
export function makeTransaction(
  override: Partial<TransactionProps> = {},
  id?: UniqueEntityID,
) {
  const transaction = Transaction.create(
    {
      description: faker.lorem.sentence(),
      accountId: new UniqueEntityID(),
      budgetId: new UniqueEntityID(),
      amount: faker.number.int(),
      ...override,
    },
    id,
  )

  return transaction
}
