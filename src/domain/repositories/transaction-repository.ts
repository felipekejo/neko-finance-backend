import { PaginationParams } from '@/core/repositories/pagination-params'
import { Transaction } from '../entities/transaction'

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>
  abstract findById(id: string): Promise<Transaction | null>
  abstract findManyRecent(params: PaginationParams): Promise<Transaction[]>
  // findManyByMonthAndType(
  //   month: string,
  //   type: 'INCOMES' | 'EXPENSES',
  //   accountId: string,
  // ): Promise<Transaction[]>
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

  abstract save(transaction: Transaction): Promise<void>

  abstract delete(transaction: Transaction): Promise<void>
}
