import { CreateUserUseCase } from "@modules/user/useCases/CreateUser/CreateUserUseCase";
import { ICreateUserRequestDTO } from "@modules/user/useCases/CreateUser/ICreateUserRequestDTO";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Request, Response } from "express";

export class CreateUserController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { email, password, name } = req.body as ICreateUserRequestDTO;

    await this.createUserUseCase.execute({ email, password, name });

    return this.created(res);
  }
}
