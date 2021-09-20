import { IHashProvider } from "@modules/user/providers/IHashProvider";
import { ITokenProvider } from "@modules/user/providers/ITokenProvider";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { IAuthRequestDTO } from "./IAuthRequestDTO";

export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider
  ) {}

  async execute(data: IAuthRequestDTO): Promise<string | any> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    if (!user.isActive) {
      throw new AppError("Inactive User");
    }

    const isValidPassword = this.hashProvider.compareHash(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = await this.tokenProvider.generateToken(user);

    return {
      id: user.id,
      email: user.email,
      token,
    };
  }
}
