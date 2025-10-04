import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface BetterAuthUser {
  id: string
  name: string
  email: string
  emailVerified?: Date
  image?: string
  role?: string
  createdAt: Date
  updatedAt: Date
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): BetterAuthUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)

export const CurrentSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.session
  },
)
