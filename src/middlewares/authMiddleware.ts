import { Response, NextFunction } from "express";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import { API_KEY } from "@/config";
import { User } from "@/types/express";

import { HttpException } from "@/exceptions/httpexception";

export class AuthMiddleware {
  verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) throw new HttpException(500, "Token invalid");

      const verifyUser = verify(token, String(API_KEY));
      if (!verifyUser) throw new HttpException(500, "Unauthorized");

      req.user = verifyUser as User;

      next();
    } catch (err) {
      next(err);
    }
  };
}
