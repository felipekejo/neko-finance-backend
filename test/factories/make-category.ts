import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Category, CategoryProps } from "@/domain/entities/category";

import { faker } from '@faker-js/faker';
export function makeCategory(
  override: Partial<CategoryProps> = {},
  id?:UniqueEntityID,
){
  enum TypeTransaction { EXPENSES = 'EXPENSES', INCOMES = 'INCOMES' } 

  const category = Category.create({
    name: faker.lorem.sentence(),
    budgetId: new UniqueEntityID(),
    type: faker.helpers.enumValue(TypeTransaction),
    ...override
  },id)

  return category
}

