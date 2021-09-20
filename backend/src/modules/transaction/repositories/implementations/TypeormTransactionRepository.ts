import { Transaction } from "@modules/transaction/entities/Transaction";
import { TransactionEntity } from "@modules/transaction/infra/typeorm/entities/TransactionEntity";
import { getRepository } from "typeorm";
import { ITransactionRepository } from "../ITransactionRepository";

export class TypeormTransactionRepository implements ITransactionRepository {
  private repository = getRepository(TransactionEntity)

  async save(transaction: Transaction): Promise<void> {
    await this.repository.save(transaction)
  }

  async index(page: number = 0): Promise<TransactionEntity[]> {
    const skipNumber = page > 0 && page * 10

    const transactions = await this.repository.find({
      skip: skipNumber || page,
      take: 10
    })

    return transactions
  }

  async findById(id: string): Promise<TransactionEntity | undefined> {
    const transaction = await this.repository.findOne(id)
    return transaction
  }

  async findByStoreId(id: string): Promise<TransactionEntity[]> {
    const transactions = await this.repository.find({ where: { store: id } })
    return transactions
  }
}