import { Budget } from '../entities/budget'

export interface BudgetsRepository {
  create(budget: Budget): Promise<void>
  findById(id: string): Promise<Budget | null>
  delete(budget: Budget): Promise<void>
  save(budget: Budget): Promise<void>
}
