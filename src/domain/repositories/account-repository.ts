import { Account } from "../entities/account"

export interface AccountsRepository {
  create(account: Account): Promise<void>
  findById(id: string): Promise<Account | null>
}
