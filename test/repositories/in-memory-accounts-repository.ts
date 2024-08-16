
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

  async delete(account: Account): Promise<void> {
    
    const itemIndex = this.items.findIndex((item) => item.id === account.id)

    this.items.splice(itemIndex, 1)
  }

  async save(account: Account): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === account.id)

    this.items[itemIndex] = account
    
  }

}
