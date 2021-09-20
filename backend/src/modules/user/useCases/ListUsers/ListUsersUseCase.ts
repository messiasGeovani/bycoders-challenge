import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { UserEntity } from "@modules/user/infra/typeorm/entities/UserEntity";

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    page: number
  ): Promise<UserEntity[]> {
    return await this.userRepository.index(page);
  }
}
