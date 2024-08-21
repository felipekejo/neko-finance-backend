import { Either, left, right } from '@/core/either'
import { AccountsRepository } from '../repositories/account-repository'

interface DeleteAccountUseCaseRequest {
  accountId: string
  ownerId: string
}

type DeleteAccountUseCaseResponse = Either<string, {}>

export class DeleteAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    accountId,
    ownerId,
  }: DeleteAccountUseCaseRequest): Promise<DeleteAccountUseCaseResponse> {
    const account = await this.accountsRepository.findById(accountId)

    if (!account) {
      return left('Account not found')
    }

    if (account.ownerId.toString() !== ownerId) {
      return left('Unauthorized')
    }

    await this.accountsRepository.delete(account)
    return right({})
  }
}
