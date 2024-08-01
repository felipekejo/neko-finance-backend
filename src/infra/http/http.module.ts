import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { CreateUserController } from './controller/create-user.controller'

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [PrismaService],
})
export class HttpModule {}
