import { UserEntity } from "@modules/user/infra/typeorm/entities/UserEntity";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserEntity | undefined> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    const user = await this.userRepository.findById(id);
    return user;
  }
}
