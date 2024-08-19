import { Account } from '../entities/account'

export interface AccountsRepository {
  create(account: Account): Promise<void>
  findById(id: string): Promise<Account | null>
  delete(account: Account): Promise<void>
  save(account: Account): Promise<void>
}
