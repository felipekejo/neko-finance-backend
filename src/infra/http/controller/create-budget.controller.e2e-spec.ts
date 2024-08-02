import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })

  test('[POST] /budgets', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'j@j.com',
        password: await hash('123456', 8),
        role: 'CLIENT',
      },
    })
    const accessToken = jwt.sign({ sub: user.id })
    const response = await request(app.getHttpServer())
      .post('/budgets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'My budget',
        ownerId: user.id,
      })

    expect(response.statusCode).toEqual(201)

    const budgetOnDB = await prisma.budget.findFirst({
      where: {
        name: 'My budget',
      },
    })

    expect(budgetOnDB).toBeTruthy()
  })
})
