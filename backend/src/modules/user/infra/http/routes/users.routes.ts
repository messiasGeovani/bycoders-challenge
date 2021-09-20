import {
  createUserController,
  findUserController,
  listUsersController,
} from "@modules/user";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/", (req, res) => createUserController.execute(req, res));
usersRouter.get("/", ensureAuthenticated, (req, res) =>
  listUsersController.execute(req, res)
);
usersRouter.get("/:id", ensureAuthenticated, (req, res) =>
  findUserController.execute(req, res)
);
export { usersRouter };
