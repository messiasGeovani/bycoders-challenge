import { authController } from "@modules/user";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/", (req, res) => authController.execute(req, res));

export { authRouter };
