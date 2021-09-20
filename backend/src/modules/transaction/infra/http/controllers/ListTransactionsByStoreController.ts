import { ListTransactionsByStoreUseCase } from "@modules/transaction/useCases/ListTransactionsByStore/ListTransactionsByStoreUseCase";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express";

export class ListTransactionsByStoreController extends BaseController {
  constructor(private listTransactionsByStoreUseCase: ListTransactionsByStoreUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { storeId } = req.params

    const transactions = await this.listTransactionsByStoreUseCase.execute(storeId);

    return this.ok(res, transactions);
  }
}
