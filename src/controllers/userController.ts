import { Request, Response, NextFunction } from "express";
import { Auth, LoginAuth } from "@/interfaces/authInterface";

import { AuthAction } from "@/actions/authAction";

import Container from "typedi";

export class UserController {
  auth = Container.get(AuthAction);

  public registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, email, password, phone, referralcode, redeemedPoints }: Auth = req.body;

      const result = await this.auth.registerAction({ username, email, password, phone, referralcode, redeemedPoints });

      res.status(200).json({
        message: "Register success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password }: LoginAuth = req.body;

      const result = await this.auth.loginAction({ email, password });

      res.status(200).json({
        message: "Login success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.user;

      const result = await this.auth.refreshTokenAction(email);

      res.status(200).json({
        message: "Refresh token success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public verifyController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.user;

      await this.auth.verifyAction(email);

      res.status(200).json({
        message: "Verify success",
      });
    } catch (err) {
      next(err);
    }
  };
}
