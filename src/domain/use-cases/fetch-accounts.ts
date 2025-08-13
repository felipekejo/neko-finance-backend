import { left, right, type Either } from "@/core/either";
import { Injectable } from "@nestjs/common";
import type { Account } from "../entities/account";
import type { AccountsRepository } from "../repositories/account-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchAccountsUseCaseRequest {
  budgetId: string;
}
type FetchAccountsUseCaseResponse = Either<ResourceNotFoundError, {
  accounts: Account[]
}>;



@Injectable()
export class FetchAccountsUseCase {
  constructor(private accountsRepository: AccountsRepository) {}
  async execute({ budgetId }: FetchAccountsUseCaseRequest): Promise<FetchAccountsUseCaseResponse> {
    const accounts = await this.accountsRepository.findMany(budgetId);
    if (accounts.length === 0) {
      return left(new ResourceNotFoundError());
    }
    return right({ accounts });
  }
}