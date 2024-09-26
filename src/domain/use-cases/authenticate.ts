import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/user-repository'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

type UserRole = 'ADMIN' | 'CLIENT'
interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  null,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      return left(new UserAlreadyExistError(email))
    }

    return right({ user })
  }
}
