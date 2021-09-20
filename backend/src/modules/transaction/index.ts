import { storeRepository } from "@modules/store";
import { ListTransactionsByStoreController } from "./infra/http/controllers/ListTransactionsByStoreController";
import { ListTransationsController } from "./infra/http/controllers/ListTransactionsController";
import { TypeormTransactionRepository } from "./repositories/implementations/TypeormTransactionRepository";
import { CreateTransactionsUseCase } from "./useCases/CreateTransactions/CreateTransactionsUseCase";
import { ListTransactionsUseCase } from "./useCases/ListTransactions/ListTransactionsUseCase";
import { ListTransactionsByStoreUseCase } from "./useCases/ListTransactionsByStore/ListTransactionsByStoreUseCase";

const transactionRepository = new TypeormTransactionRepository()

const createTransactionsUseCase = new CreateTransactionsUseCase(transactionRepository, storeRepository)
const listTransactionsUseCase = new ListTransactionsUseCase(transactionRepository)
const listTransactionsByStoreUseCase = new ListTransactionsByStoreUseCase(transactionRepository)

const listTransactionsController = new ListTransationsController(listTransactionsUseCase)
const listTransactionsByStoreController = new ListTransactionsByStoreController(listTransactionsByStoreUseCase)

export {
  createTransactionsUseCase,
  listTransactionsUseCase,
  listTransactionsByStoreUseCase,
  listTransactionsController,
  listTransactionsByStoreController
}