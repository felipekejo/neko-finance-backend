import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import request from 'supertest'
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { AccountFactory } from "test/factories/make-account"
import { BudgetFactory } from "test/factories/make-budget"
import { TransactionFactory } from "test/factories/make-transaction"
import { UserFactory } from "test/factories/make-user"

describe('Fetch Transactions (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let budgetFactory: BudgetFactory
  let accountFactory: AccountFactory
  let transactionFactory: TransactionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, BudgetFactory, AccountFactory, TransactionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    budgetFactory = moduleRef.get(BudgetFactory)
    accountFactory = moduleRef.get(AccountFactory)
    transactionFactory = moduleRef.get(TransactionFactory)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })

  test('[GET] /budgets/:budgetId/transactions', async () => {
    const user = await userFactory.makePrismaUser()
    const budget = await budgetFactory.makePrismaBudget()
    const account = await accountFactory.makePrismaAccount({
      budgetId: budget.id,
      ownerId: user.id,
    })
    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      transactionFactory.makePrismaTransaction({
        accountId: account.id,
        amount: 100,
        description: "Transaction 1",
      }),
      transactionFactory.makePrismaTransaction({
        accountId: account.id,
        amount: 200,
        description: "Transaction 2",
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/budgets/${budget.id}/transactions`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      transactions: expect.arrayContaining([
        expect.objectContaining({
          description: 'Transaction 1',
          amount: 100,
        }),
        expect.objectContaining({
          description: 'Transaction 2',
          amount: 200,
        }),
      ]),
    })
  })
})