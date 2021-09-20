
import { listTransactionsByStoreController, listTransactionsController } from "@modules/transaction";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const storesRouter = Router();

storesRouter.get("/", ensureAuthenticated, (req, res) =>
  listTransactionsController.execute(req, res)
);
storesRouter.get("/storeId", ensureAuthenticated, (req, res) =>
  listTransactionsByStoreController.execute(req, res)
);
export { storesRouter };
