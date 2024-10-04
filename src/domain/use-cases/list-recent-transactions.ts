// import { Either, right } from '@/core/either'
// import { Transaction } from '../entities/transaction'
// import { TransactionsRepository } from '../repositories/transaction-repository'

// interface ListRecentTransactionsUseCaseRequest {
//   page: number
// }

// type ListRecentTransactionsUseCaseResponse = Either<
//   null,
//   {
//     transactions: Transaction[]
//   }
// >

// @Injectable()
// export class ListRecentTransactionsUseCase {
//   constructor(private transactionsRepository: TransactionsRepository) {}

//   async execute({
//     page,
//   }: ListRecentTransactionsUseCaseRequest): Promise<ListRecentTransactionsUseCaseResponse> {
//     const transactions = await this.transactionsRepository.findManyRecent({
//       page,
//     })
//     return right({ transactions })
//   }
// }
