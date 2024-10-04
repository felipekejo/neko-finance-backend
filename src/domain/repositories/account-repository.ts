import { Account } from '../entities/account'

export abstract class AccountsRepository {
  abstract create(account: Account): Promise<void>
  abstract findById(id: string): Promise<Account | null>
  abstract delete(account: Account): Promise<void>
  abstract save(account: Account): Promise<void>
}
