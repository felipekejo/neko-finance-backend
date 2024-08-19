import { Account } from '../entities/account'
import { AccountsRepository } from '../repositories/account-repository'

interface GetAccountByIdUseCaseRequest {
  id: string
}

interface GetAccountByIdUseCaseResponse {
  account: Account
}

export class GetAccountByIdUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    id,
  }: GetAccountByIdUseCaseRequest): Promise<GetAccountByIdUseCaseResponse> {
    const account = await this.accountsRepository.findById(id)
    if (!account) {
      throw new Error('Account not found')
    }
    return { account }
  }
}
