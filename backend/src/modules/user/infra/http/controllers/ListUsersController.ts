import { ListUsersUseCase } from "@modules/user/useCases/ListUsers/ListUsersUseCase";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express-serve-static-core";

export class ListUsersController extends BaseController {
  constructor(private listUsersUseCase: ListUsersUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { page } = req.query;

    const users = await this.listUsersUseCase.execute(Number(page));

    return this.ok(res, users);
  }
}
