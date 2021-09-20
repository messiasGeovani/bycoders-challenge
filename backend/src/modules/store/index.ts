import { ListStoresController } from "./infra/http/controllers/ListStoresController";
import { SearchStoreController } from "./infra/http/controllers/SearchStoreController";
import { TypeormStoreRepository } from "./repositories/implementations/TypeormStoreRepository";
import { CreateStoresUseCase } from "./useCases/CreateStore/CreateStoresUseCase";
import { ListStoresUseCase } from "./useCases/ListStores/ListStoresUseCase";
import { SearchStoreUseCase } from "./useCases/SearchStore/SearchStoreUseCase";

const storeRepository = new TypeormStoreRepository()

const createStoresUseCase = new CreateStoresUseCase(storeRepository)
const listStoresUseCase = new ListStoresUseCase(storeRepository)
const searchStoreUseCase = new SearchStoreUseCase(storeRepository)

const listStoresController = new ListStoresController(listStoresUseCase)
const searchStoreController = new SearchStoreController(searchStoreUseCase)

export { storeRepository, createStoresUseCase, listStoresUseCase, searchStoreUseCase, listStoresController, searchStoreController }