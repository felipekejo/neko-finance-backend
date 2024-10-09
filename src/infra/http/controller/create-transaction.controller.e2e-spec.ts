import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { BudgetFactory } from 'test/factories/make-budget'
import { UserFactory } from 'test/factories/make-user'

describe('Create Transaction (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let userFactory: UserFactory
  let budgetFactory: BudgetFactory
  let accountFactory: AccountFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, BudgetFactory, AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    budgetFactory = moduleRef.get(BudgetFactory)
    accountFactory = moduleRef.get(AccountFactory)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })

  test('[POST] /transactions', async () => {
    const user = await userFactory.makePrismaUser()
    const budget = await budgetFactory.makePrismaBudget({
      ownerId: user.id,
    })
    const account = await accountFactory.makePrismaAccount({
      budgetId: budget.id,
      ownerId: user.id,
    })
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'My Transaction',
        type: 'INCOMES',
        budgetId: budget.id,
        amount: 100,
        accountId: account.id,
        date: new Date(),
      })

    expect(response.statusCode).toEqual(201)

    const transactionOnDB = await prisma.transaction.findFirst({
      where: {
        description: 'My Transaction',
      },
    })

    expect(transactionOnDB).toBeTruthy()
  })
})
