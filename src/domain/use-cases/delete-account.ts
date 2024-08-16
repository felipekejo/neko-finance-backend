import { AccountsRepository } from '../repositories/account-repository'

interface DeleteAccountUseCaseRequest {
  accountId: string
  ownerId: string
}

interface DeleteAccountUseCaseResponse {

}

export class DeleteAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({ accountId, ownerId }: DeleteAccountUseCaseRequest):Promise<DeleteAccountUseCaseResponse> {
    const account = await this.accountsRepository.findById(accountId)

    if (!account) {
      throw new Error('Account not found')
    }

    if (account.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized')
    }

    await this.accountsRepository.delete(account)
    return {  }
  }
}
