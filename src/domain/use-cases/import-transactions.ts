import { Transaction } from '@/domain/entities/transaction'
import { Injectable } from '@nestjs/common'
import { parse } from 'csv-parse/sync'
import { AccountsRepository } from '../repositories/account-repository'
import { CategoriesRepository } from '../repositories/category-repository'
import type { SubcategoriesRepository } from '../repositories/subcategory-repository'
import type { AccountService } from '../service/account.service'
import type { CategoryService } from '../service/category.service'
import type { SubcategoryService } from '../service/subcategory.service'
import type { TransactionService } from '../service/transaction.service'

interface ImportTransactionsRequest {
  budgetId: string
  ownerId: string
  csvBuffer: Buffer
}

type csvRow = {
  description: string
  amount: string
  date: string
  category: string
  account: string
  type: 'INCOMES' | 'EXPENSES'
}

@Injectable()
export class ImportTransactionsUseCase {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private subcategoryService: SubcategoryService,
    private accountsRepository: AccountsRepository,
    private categoriesRepository: CategoriesRepository,
    private subcategoriesRepository: SubcategoriesRepository,
  ) {}

  async execute({ budgetId, ownerId, csvBuffer }: ImportTransactionsRequest) {
    const results: Transaction[] = []

    const rows: csvRow[] = await this.parseCsv(csvBuffer)

    for (const row of rows) {
      let category
      let account
      let subcategory

        category = await this.categoriesRepository.findByName({
          name: row.category,
          budgetId: budgetId,
        })
        if (!category) {
          category = await this.categoryService.create({
              name: row.category,
              budgetId: budgetId,
              type: row.type
            })
        }

        account = await this.accountsRepository.findByName({
          name: row.account,
          budgetId: budgetId,
        })

        if(!account){
          account = await this.accountService.createAccount({
            name: row.account,
            budgetId: budgetId,
            balance: 0,
            ownerId
          })
        }


      const transaction = await this.transactionService.createTransaction({
        description: row.description,
        amount: parseFloat(row.amount),
        date: new Date(row.date),
        budgetId,
        categoryId: category.id.toString(),
        accountId: account.id.toString(),
        type: row.type
      })

      if (transaction.isLeft()) {
        continue
      }
      results.push(transaction.value.transaction)
    }

    return { imported: results.length }
  }

  private parseCsv(buffer: Buffer) {
    return parse<csvRow>(buffer, {
      columns: true,
      skip_empty_lines: true,
    })
  }
}