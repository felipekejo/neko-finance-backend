import { AccountsRepository } from '../repositories/account-repository'

interface EditAccountUseCaseRequest {
  accountId: string
  ownerId: string
  name: string
  balance: number
}

interface EditAccountUseCaseResponse {}

export class EditAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    accountId,
    ownerId,
    name,
    balance,
  }: EditAccountUseCaseRequest): Promise<EditAccountUseCaseResponse> {
    const account = await this.accountsRepository.findById(accountId)

    if (!account) {
      throw new Error('Account not found')
    }

    if (account.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    account.name = name
    account.balance = balance

    await this.accountsRepository.save(account)
    return {}
  }
}
