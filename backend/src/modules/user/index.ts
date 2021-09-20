import { CreateUserController } from "@modules/user/infra/http/controllers/CreateUserController";
import { BCryptHashProvider } from "@modules/user/providers/implementations/BCryptHashProvider";
import { JwtTokenProvider } from "@modules/user/providers/implementations/JwtTokenProvider";
import { AuthController } from "./infra/http/controllers/AuthController";
import { FindUserController } from "./infra/http/controllers/FindUserController";
import { ListUsersController } from "./infra/http/controllers/ListUsersController";
import { TypeormUserRepository } from "./repositories/implementations/TypeormUserRepository";
import { AuthService } from "./services/Auth/AuthService";
import { CreateUserUseCase } from "./useCases/CreateUser/CreateUserUseCase";
import { FindUserUseCase } from "./useCases/FindUser/FindUserUseCase";
import { ListUsersUseCase } from "./useCases/ListUsers/ListUsersUseCase";

const userRepository = new TypeormUserRepository();

const hashProvider = new BCryptHashProvider();
const tokenProvider = new JwtTokenProvider();

const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);
const createUserController = new CreateUserController(createUserUseCase);

const findUserUseCase = new FindUserUseCase(userRepository);
const findUserController = new FindUserController(findUserUseCase);

const listUsersUseCase = new ListUsersUseCase(userRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

const authService = new AuthService(
  userRepository,
  hashProvider,
  tokenProvider
);
const authController = new AuthController(authService);

export {
  userRepository,
  createUserUseCase,
  createUserController,
  findUserUseCase,
  findUserController,
  listUsersUseCase,
  listUsersController,
  authService,
  authController,
};