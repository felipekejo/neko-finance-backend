import { Transaction } from "../entities/transaction"


export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
  findById(id: string): Promise<Transaction | null>
  // findByBudgetId(budgetId: string): Promise<Transaction[]>
  // findByAccountId(accountId: string): Promise<Transaction[]>
  // findByCategoryId(
  //   categoryId: string,
  //   accountId: string,
  // ): Promise<Transaction[]>
  // findByType(
  //   type: 'INCOMES' | 'EXPENSES',
  //   accountId: string,
  // ): Promise<Transaction[]>
  // findByYear(year: string, accountId: string): Promise<Transaction[]>
  // findByYearAndMonth(
  //   year: string,
  //   month: string,
  //   accountId: string,
  // ): Promise<Transaction[]>
  // findByDate(date: Date, accountId: string): Promise<Transaction[]>
  // sumAmountByType(
  //   type: 'INCOMES' | 'EXPENSES',
  //   accountId: string,
  // ): Promise<number>
  // sumAmountByYear(
  //   year: string,
  //   accountId: string,
  //   type: 'EXPENSES' | 'INCOMES',
  // ): Promise<number>

  save(transaction: Transaction): Promise<void>

  delete(id: string): Promise<void>
}
