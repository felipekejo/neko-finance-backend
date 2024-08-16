
import { Account } from '@/domain/entities/account'
import { AccountsRepository } from '@/domain/repositories/account-repository'


export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async findById(id: string) {
    const account = this.items.find((item) => item.id.toString()===id)

    if (!account) {
      return null
    }

    return account
  }

  async create(account: Account) {

    this.items.push(account)

  }
}
