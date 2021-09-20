import { TransactionEntity } from "@modules/transaction/infra/typeorm/entities/TransactionEntity";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

export class ListTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) { }

  async execute(
    page: number
  ): Promise<TransactionEntity[]> {
    return await this.transactionRepository.index(page);
  }
}
