import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { IStoreDTO } from "../dtos/IStoreDTO";
import { StoreRepository } from "../repositories/StoreRepository";

export class StoreController {
  private storeRepository = getCustomRepository(StoreRepository);

  public async create(req: Request, res: Response) {
    const isValidStore = this.validateFields(req.body);

    if (!isValidStore) {
      return res.status(400).json({
        message: "invalid fields",
      });
    }

    const store = await this.storeRepository.save(req.body);

    return res.json(store);
  }

  private validateFields(store: IStoreDTO) {
    if (!store.name || !store.owner) {
      return false;
    }

    return true;
  }
}
