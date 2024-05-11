import { EventInt } from "@/interfaces/eventInterface";
import { HttpException } from "@/exceptions/httpexception";

import Container, { Service } from "typedi";

import { EventQuery } from "@/queries/eventQuery";
import { UserQuery } from "@/queries/userQuery";

@Service()
export class EventAction {
  userQuery = Container.get(UserQuery);
  eventQuery = Container.get(EventQuery);

  public getEventAction = async (email: string) => {
    try {
      const user = await this.userQuery.getUserByEmail(email);

      if (!user) throw new HttpException(500, "Something went wrong");

      const result = await this.eventQuery.getEventQuery(user.id);

      return result;
    } catch (err) {
      throw err;
    }
  };

  public createEventAction = async (email: string, name: string, description: string, 
    city: string, address: string, start_date: string, end_date: string, isActive: boolean) => {
    try {
        if (!name.trim() || !description.trim() || !city.trim() || !address.trim() || !start_date.trim() || !end_date.trim()) {
            throw new HttpException(400, "All fields must be filled");
        }

      const user = await this.userQuery.getUserByEmail(email);

      if (!user) throw new HttpException(500, "Something went wrong");

      const result = await this.eventQuery.createEventQuery(user.id, name, description, city, address, start_date, end_date, isActive);

      return result;
    } catch (err) {
      throw err;
    }
  };
}
