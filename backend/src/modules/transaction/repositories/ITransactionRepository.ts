import { Transaction } from "../entities/Transaction";
import { TransactionEntity } from "../infra/typeorm/entities/TransactionEntity";

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  index(page: number): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | undefined>;
  findByStoreId(id: string): Promise<TransactionEntity[]>;
}
