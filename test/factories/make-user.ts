import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/entities/user'

import { faker } from '@faker-js/faker'
export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const account = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'CLIENT',
      ...override,
    },
    id,
  )

  return account
}
