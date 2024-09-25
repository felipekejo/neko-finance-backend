import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { User } from '../entities/user'
import { UsersRepository } from '../repositories/user-repository'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

type UserRole = 'ADMIN' | 'CLIENT'
interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistError,
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      return left(new UserAlreadyExistError())
    }

    const hashedPassword = await hash(password, 8)
    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })
    await this.usersRepository.create(user)
    return right({ user })
  }
}
