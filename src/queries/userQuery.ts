import { db } from "../../prisma/client";
import { User } from "@/interfaces/userInterface";

import { Service } from "typedi";

@Service()
export class UserQuery {
  public getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (err) {
      console.error("Error fetching user by email:", err);
      throw new Error("Error fetching user by email");
    }
  };

  
}
