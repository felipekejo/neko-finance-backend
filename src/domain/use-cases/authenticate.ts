import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { User } from '../entities/user'
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
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    role,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      return left(new UserAlreadyExistError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)
    const user = User.({
      name,
      email,
      password: hashedPassword,
      role,
    })
    await this.usersRepository.Authenticate(user)
    return right({ user })
  }
}
