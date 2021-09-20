import { Store } from "../entities/Store";
import { StoreEntity } from "../infra/typeorm/entities/StoreEntity";

export interface IStoreRepository {
  save(store: Store): Promise<void>;
  index(page: number): Promise<StoreEntity[]>;
  findById(id: string): Promise<StoreEntity | undefined>;
  find(name: string, owner: string): Promise<StoreEntity | undefined>;
  search(name: string): Promise<StoreEntity[]>;
}
