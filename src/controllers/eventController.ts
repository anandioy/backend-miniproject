import { Request, Response, NextFunction } from "express";
import { EventInt } from "@/interfaces/eventInterface";
import Container from "typedi";

import { EventAction } from "@/actions/eventAction";

export class EventController {
  event = Container.get(EventAction);

  public getEventController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.user;

      const result = await this.event.getEventAction(email);

      res.status(200).json({
        message: "Get Event success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public createEventController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.user;
      const { name, description, city, address, start_date, end_date, isActive } = req.body;

      const result = await this.event.createEventAction(email, name, description, city, address, start_date, end_date, isActive);

      res.status(200).json({
        message: "Create Event success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
