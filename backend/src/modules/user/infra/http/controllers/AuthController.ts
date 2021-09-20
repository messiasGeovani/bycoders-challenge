import { AuthService } from "@modules/user/services/Auth/AuthService";
import { IAuthRequestDTO } from "@modules/user/services/Auth/IAuthRequestDTO";
import { BaseController } from "@shared/infra/http/models/BaseController";
import { Response } from "express";
import { Request } from "express-serve-static-core";

export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    const { email, password } = req.body as IAuthRequestDTO;

    const authData = await this.authService.execute({ email, password });

    return this.ok(res, authData);
  }
}
