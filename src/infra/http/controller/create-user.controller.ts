import { CreateUserUseCase } from '@/domain/use-cases/create-user'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'CLIENT']),
})
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>
@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { name, email, password, role } = body

    const result = await this.createUser.execute({
      name,
      email,
      password,
      role,
    })

    if (result.isLeft()) {
      throw new Error()
    }
  }
}
