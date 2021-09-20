import { FindUserUseCase } from "@modules/user/useCases/FindUser/FindUserUseCase";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express";

export class FindUserController extends BaseController {
  constructor(private findUserUseCase: FindUserUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { id } = req.params;

    const user = await this.findUserUseCase.execute(id);

    return this.ok(res, user);
  }
}
