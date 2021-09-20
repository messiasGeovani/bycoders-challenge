import { User } from "@modules/user/entities/User";
import { IHashProvider } from "@modules/user/providers/IHashProvider";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserRequestDTO } from "./ICreateUserRequestDTO";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
    }

    const passwordHash = await this.hashProvider.generateHash(data.password);

    const user = new User({ ...data, password: passwordHash });

    await this.userRepository.save(user);
  }
}
