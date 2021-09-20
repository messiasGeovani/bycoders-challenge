
import { listStoresController, searchStoreController } from "@modules/store";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const storesRouter = Router();

storesRouter.get("/", ensureAuthenticated, (req, res) =>
  listStoresController.execute(req, res)
);
storesRouter.get("/search", ensureAuthenticated, (req, res) =>
  searchStoreController.execute(req, res)
);
export { storesRouter };
