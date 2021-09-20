import { getRepository } from "typeorm";

import { IStoreRepository } from "../IStoreRepository";
import { StoreEntity } from "@modules/store/infra/typeorm/entities/StoreEntity";
import { Store } from "@modules/store/entities/Store";

export class TypeormStoreRepository implements IStoreRepository {
  private repository = getRepository(StoreEntity)

  async findByEmail(email: string): Promise<StoreEntity | undefined> {
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  async save(store: Store): Promise<void> {
    await this.repository.save(store)
  }

  async index(page: number = 0): Promise<StoreEntity[]> {
    const skipNumber = page > 0 && page * 10

    const users = await this.repository.find({
      skip: skipNumber || page,
      take: 10
    })

    return users
  }

  async findById(id: string): Promise<StoreEntity | undefined> {
    const user = await this.repository.findOne(id)
    return user
  }

  async find(name: string, owner: string): Promise<StoreEntity | undefined> {
    const store = await this.repository.findOne({ where: { name, owner } })
    return store
  }

  async search(name: string): Promise<StoreEntity[]> {
    const stores = await this.repository.find({ where: { name } })
    return stores
  }
}