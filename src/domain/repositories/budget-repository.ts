import { Budget } from '../entities/budget'

export interface BudgetsRepository {
  create(budget: Budget): Promise<Budget>
  // findById(id: string): Promise<Budget | null>
}
