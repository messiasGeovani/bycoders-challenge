import { ListTransactionsUseCase } from "@modules/transaction/useCases/ListTransactions/ListTransactionsUseCase";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express-serve-static-core";

export class ListTransationsController extends BaseController {
  constructor(private listTransactionsUseCase: ListTransactionsUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { page } = req.query;

    const transactions = await this.listTransactionsUseCase.execute(Number(page));

    return this.ok(res, transactions);
  }
}
