import { Store } from "@modules/store/entities/Store";
import { IStoreRepository } from "@modules/store/repositories/IStoreRepository";
import { Transaction } from "@modules/transaction/entities/Transaction";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateTransactionsRequestDTO } from "./ICreateTransactionsRequestDTO";

export class CreateTransactionsUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private storeRepository: IStoreRepository
  ) { }

  async execute(data: ICreateTransactionsRequestDTO[]): Promise<void> {
    if (!data || !data.length) {
      throw new AppError('Invalid data', 400)
    }

    await Promise.all(data.map((transactionInfo: ICreateTransactionsRequestDTO, index: number) => {
      this.storeRepository.findById(transactionInfo.storeId)
        .then((store) => {
          if (!store) {
            return
          }

          const transaction = new Transaction({ ...transactionInfo, store })
          this.transactionRepository.save(transaction)
        })
    }))
  }
}
