import { ListStoresUseCase } from "@modules/store/useCases/ListStores/ListStoresUseCase";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express-serve-static-core";

export class ListStoresController extends BaseController {
  constructor(private listStoresUseCase: ListStoresUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { page } = req.query;

    const stores = await this.listStoresUseCase.execute(Number(page));

    return this.ok(res, stores);
  }
}
