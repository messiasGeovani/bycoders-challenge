import { AppError } from "@shared/errors/AppError";
import dayjs from "@shared/infra/plugins/dayjs";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  email: string;
  isActive: boolean;
  role: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Error, Login Token is necessary", 400);
  }

  const token = authorization.replace("Bearer", "").trim();

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("[ensureAuthenticated]: JWT_SECRET env is not defined");
  }

  const expiredTokenMessage = "[ensureAuthenticated]: Expired token";

  try {
    const decoded = verify(token, secret);
    const { id, email, isActive, role, ...tokenInfo } =
      decoded as ITokenPayload;

    const currentTime = dayjs();
    const expirationDate = dayjs.unix(tokenInfo.exp);

    const isExpiredToken = expirationDate.diff(currentTime, "hour") <= 0;

    if (isExpiredToken) {
      throw new Error(expiredTokenMessage);
    }

    req.user = {
      id,
      email,
      isActive,
      role,
    };

    return next();
  } catch (error: any) {
    if (error.message === expiredTokenMessage) {
      throw new AppError("Expired Token", 401);
    }

    throw new AppError("Invalid token", 401);
  }
}
