import { ITokenProvider } from "../ITokenProvider";
import { sign } from "jsonwebtoken";
import { IUserDocument } from "@modules/user/infra/mongoose/documents/IUserDocument";

export class JwtTokenProvider implements ITokenProvider {
  private jwtSecret = process.env.JWT_SECRET;

  generateToken(user: IUserDocument): string | void {
    if (!this.jwtSecret) {
      throw new Error("JWT_SECRET env is not defined");
    }

    return sign(
      {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        role: user.role,
      },
      this.jwtSecret,
      { expiresIn: "6h" }
    );
  }
}
