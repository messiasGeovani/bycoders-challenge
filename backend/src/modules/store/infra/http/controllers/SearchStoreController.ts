import { SearchStoreUseCase } from "@modules/store/useCases/SearchStore/SearchStoreUseCase";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express";

export class SearchStoreController extends BaseController {
  constructor(private searchStoreUseCase: SearchStoreUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { text } = req.query;

    if (!text) {
      return this.clientError(res, 'Invalid text')
    }

    const stores = await this.searchStoreUseCase.execute(text.toString());

    return this.ok(res, stores);
  }
}
