import { getRepository } from "typeorm";

import { UserEntity } from "@modules/user/infra/typeorm/entities/UserEntity";
import { IUserRepository } from "../IUserRepository";
import { User } from "@modules/user/entities/User";

export class TypeormUserRepository implements IUserRepository {
  private repository = getRepository(UserEntity)

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user)
  }

  async index(page: number = 0): Promise<UserEntity[]> {
    const skipNumber = page > 0 && page * 10

    const users = await this.repository.find({
      skip: skipNumber || page,
      take: 10
    })

    return users
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.repository.findOne(id)
    return user
  }
}