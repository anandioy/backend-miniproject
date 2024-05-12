import { db } from "../../prisma/client";
import { EventInt } from "@/interfaces/eventInterface";
import { create } from "domain";
import { start } from "repl";
import { Service } from "typedi";

@Service()
export class EventQuery {
  public getEventQuery = async (userId: string): Promise<EventInt[] | null> => {
    try {
      const event = await db.event.findMany({
        where: {
          userId,
        },
      });

      return event;
    } catch (err) {
      console.error("Error fetching event by id:", err);
      throw new Error("Error fetching event by id");
    }
  };

  public createEventQuery = async (
    userId: string,
    name: string,
    description: string,
    city: string,
    address: string, 
    start_date: Date | string, 
    end_date: Date | string,
    isActive: boolean
  ): Promise<EventInt> => {

      if(typeof start_date === 'string'){
        start_date = new Date(start_date)
      }

      if(typeof end_date === 'string'){
        end_date = new Date(end_date)
      }
      
        try {
          const createdEvent = await db.event.create({
            data: {
              name,
              description,
              city,
              address,
              start_date,
              end_date,
              isActive,
              createdBy : {
                connect:{ id: userId }
              }
            },
          });

          return createdEvent;
        } catch (err) {
          console.error("Error creating event", err);
          throw new Error("Error creating event");
        }
     }
    }
