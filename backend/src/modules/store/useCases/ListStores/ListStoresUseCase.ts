import { StoreEntity } from "@modules/store/infra/typeorm/entities/StoreEntity";
import { IStoreRepository } from "@modules/store/repositories/IStoreRepository";

export class ListStoresUseCase {
  constructor(private storeRepository: IStoreRepository) { }

  async execute(
    page: number
  ): Promise<StoreEntity[]> {
    return await this.storeRepository.index(page);
  }
}
