import { User } from "../entities/User";
import { UserEntity } from "../infra/typeorm/entities/UserEntity";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | undefined>;
  save(user: User): Promise<void>;
  index(page: number): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | undefined>;
}
