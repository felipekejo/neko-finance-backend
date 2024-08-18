import { Transaction } from '@/domain/entities/transaction'
import { TransactionsRepository } from '@/domain/repositories/transaction-repository'


export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  // async findByBudgetId(budgetId: string): Promise<Transaction[]> {
  //   const transactions = this.items.filter(
  //     (item) => item.account_id === budgetId,
  //   )
  //   return transactions
  // }

  async create(transaction: Transaction): Promise<void> {


    this.items.push(transaction)

  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id.toString() === id)
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id.toString() === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  // async findByAccountId(accountId: string) {
  //   const transactions = this.items.filter(
  //     (item) => item.account_id === accountId,
  //   )

  //   return transactions
  // }

  // async findByCategoryId(categoryId: string, accountId: string) {
  //   const transactions = this.items.filter(
  //     (item) =>
  //       item.account_id === accountId && item.category_id === categoryId,
  //   )
  //   return transactions
  // }

  // async findByType(type: 'INCOMES' | 'EXPENSES', accountId: string) {
  //   const transactions = this.items.filter(
  //     (item) => item.account_id === accountId && item.type === type,
  //   )
  //   return transactions
  // }

  // async findByYear(year: string, accountId: string) {
  //   const transactions = this.items.filter(
  //     (item) =>
  //       item.account_id === accountId &&
  //       new Date(item.created_at).getFullYear().toString() === year,
  //   )
  //   return transactions
  // }

  // async findByYearAndMonth(year: string, month: string, accountId: string) {
  //   const transactions = this.items.filter(
  //     (item) =>
  //       item.account_id === accountId &&
  //       new Date(item.created_at).getFullYear().toString() === year &&
  //       new Date(item.created_at).getMonth().toString() === month,
  //   )
  //   return transactions
  // }

  // async findByDate(date: Date, accountId: string) {
  //   const transactions = this.items.filter(
  //     (item) =>
  //       item.account_id === accountId &&
  //       new Date(item.created_at).toDateString() === date.toDateString(),
  //   )
  //   return transactions
  // }

  // async sumAmountByType(type: 'INCOMES' | 'EXPENSES', accountId: string) {
  //   const sumAmount = this.items.reduce((acc, item) => {
  //     if (item.account_id === accountId && item.type === type) {
  //       acc += item.amount
  //     }
  //     return acc
  //   }, 0)
  //   return sumAmount
  // }

  // async sumAmountByYear(
  //   year: string,
  //   accountId: string,
  //   type: 'INCOMES' | 'EXPENSES',
  // ) {
  //   const sumAmount = this.items.reduce((acc, item) => {
  //     if (
  //       item.account_id === accountId &&
  //       new Date(item.created_at).getFullYear().toString() === year &&
  //       item.type === type
  //     ) {
  //       acc += item.amount
  //     }
  //     return acc
  //   }, 0)
  //   return sumAmount
  // }

  async save(transaction: Transaction) {
    const index = this.items.findIndex((item) => item.id === transaction.id)
    if (index >= 0) {
      this.items[index] = transaction
    }

  }
}
