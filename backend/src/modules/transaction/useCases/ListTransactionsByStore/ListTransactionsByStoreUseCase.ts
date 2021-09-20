import { TransactionEntity } from "@modules/transaction/infra/typeorm/entities/TransactionEntity";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";
import { AppError } from "@shared/errors/AppError";

export class ListTransactionsByStoreUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string): Promise<TransactionEntity[]> {
    if (!id) {
      throw new AppError("Store id is required", 400);
    }

    const transactions = await this.transactionRepository.findByStoreId(id)
    return transactions;
  }
}
