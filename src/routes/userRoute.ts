import { UserController } from "@/controllers/userController";
import { EventController } from "@/controllers/eventController";
import { Routes } from "@/interfaces/routeInterface";
import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { Router } from "express";

export class AuthRoute implements Routes {
  router: Router;
  path: string;
  private Auth: UserController;

  private Guard: AuthMiddleware;
  
  private EventCtrl: EventController;

  constructor() {
    this.router = Router();
    this.path = "/auth";
    this.Auth = new UserController();
    this.EventCtrl = new EventController();
    this.Guard = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.Auth.registerController);
    this.router.post(`${this.path}/login`, this.Auth.loginController);
    this.router.get(
      `${this.path}/verify`,
      this.Guard.verifyToken,
      this.Auth.verifyController
    );
    this.router.get(
      `${this.path}/`,
      this.Guard.verifyToken,
      this.Auth.refreshTokenController
    );
    this.router.get(
      `${this.path}/profile/`,
      this.Guard.verifyToken,
      this.Auth.getUserDataController
    );
    this.router.post(
      `${this.path}/create-event`, 
      this.Guard.verifyToken,
      this.EventCtrl.createEventController
    );
  }
}
