import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Accounts (E2E)', () => {
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

  test('[GET] /accounts/$budgetId', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'j@j.com',
        password: await hash('123456', 8),
        role: 'CLIENT',
      },
    })

    const budget = await prisma.budget.create({
      data: {
        name: 'My budget',
      },
    })
    const accessToken = jwt.sign({ sub: user.id })
    await prisma.account.create({
      data:{
        name:"account1",
        budgetId:budget.id,
        ownerId:user.id
      }
    })

    const response = await request(app.getHttpServer())
      .get(`/accounts/${budget.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      accounts: expect.arrayContaining([
        expect.objectContaining({
          name: 'account1',
        }),
      ]),
    })
  })
})
