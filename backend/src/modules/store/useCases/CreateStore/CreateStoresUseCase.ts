import { Store } from "@modules/store/entities/Store";
import { IStoreRepository } from "@modules/store/repositories/IStoreRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateStoreRequestDTO } from "./ICreateStoreRequestDTO";

export class CreateStoresUseCase {
  constructor(
    private storeRepository: IStoreRepository,
  ) { }

  async execute(data: ICreateStoreRequestDTO[]): Promise<void> {
    if (!data || !data.length) {
      throw new AppError('Invalid data', 400)
    }

    await Promise.all(data.map((storeInfo: ICreateStoreRequestDTO, index: number) => {
      this.storeRepository.find(storeInfo.name, storeInfo.owner)
        .then((storeAlreadyExists) => {
          if (storeAlreadyExists) {
            data.splice(index, 1)
          }
        })
    }))

    await Promise.all(data.map((storeInfo: ICreateStoreRequestDTO) => {
      const store = new Store({ ...storeInfo });

      this.storeRepository.save(store);
    }))
  }
}
