import { StoreEntity } from "@modules/store/infra/typeorm/entities/StoreEntity";
import { IStoreRepository } from "@modules/store/repositories/IStoreRepository";
import { AppError } from "@shared/errors/AppError";

export class SearchStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(name: string): Promise<StoreEntity[]> {
    if (!name) {
      throw new AppError("Store name is required", 400);
    }

    const store = await this.storeRepository.search(name);
    return store;
  }
}
