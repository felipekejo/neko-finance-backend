// import { Either, left, right } from '@/core/either'
// import dayjs from 'dayjs'
// import { TransactionsRepository } from '../repositories/transaction-repository'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'

// interface GetCategoryByIdUseCaseRequest {
//   type: 'INCOMES' | 'EXPENSES'
//   accountId: string
// }

// type GetCategoryByIdUseCaseResponse = Either<
//   ResourceNotFoundError,
//   {
//     value: number
//     diffFromLastMonth: number
//   }
// >

// @Injectable()
// export class GetCategoryByIdUseCase {
//   constructor(private transactionRepository: TransactionsRepository) {}

//   async execute({
//     accountId,
//     type,
//   }: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
//     const today = dayjs()
//     const lastMonth = today.subtract(1, 'month')
//     const startOfLastMonth = lastMonth.startOf('month')

//     const lastMontWithYear = lastMonth.format('YYYY-MM')

//     const currentMonthWithYear = today.format('YYYY-MM')

//     const lastMonthIncome =
//       await this.transactionRepository.findManyByMonthAndType({
//         month: lastMontWithYear,
//         type,
//         accountId,
//       })

//     const currentMonthIncome =
//       await this.transactionRepository.findManyByMonthAndType({
//         month: currentMonthWithYear,
//         type,
//         accountId,
//       })

//     if (!category) {
//       return left(new ResourceNotFoundError())
//     }
//     return right({ category })
//   }
// }
