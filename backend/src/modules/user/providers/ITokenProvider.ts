import { IUserDocument } from "../infra/mongoose/documents/IUserDocument";

export interface ITokenProvider {
  generateToken(user: IUserDocument): string | void;
}
