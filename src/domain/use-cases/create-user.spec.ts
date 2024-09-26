import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create an user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      role: 'CLIENT',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].id).toEqual(result.value?.user.id)
  })

  it('should not be able to create an user if the email already exists', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      role: 'CLIENT',
    })
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      role: 'CLIENT',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistError)
  })
})
