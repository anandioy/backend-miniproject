import { API_KEY } from "@/config";

import { Auth } from "@/interfaces/authInterface";
import { User } from "@/interfaces/userInterface";
import { HttpException } from "@/exceptions/httpexception";

import Container, { Service } from "typedi";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AuthQuery } from "@/queries/authQuery";
import { UserQuery } from "@/queries/userQuery";

@Service()
export class AuthAction {
  authQuery = Container.get(AuthQuery);
  userQuery = Container.get(UserQuery);

  public registerAction = async ({ username, email, password, phone, image, referralcode, redeemedPoints }: Auth) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (findUser)
        throw new HttpException(500, "User with that email already exist");

      const salt = await genSalt(10);
      const hashPass = await hash(password, salt);

      const result = await this.authQuery.registerQuery(username, email, hashPass, phone, image, referralcode, redeemedPoints);

      return result;
    } catch (err) {
      throw err;
    }
  };

  public loginAction = async ({ email, password }: Auth) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser)
        throw new HttpException(500, "User with that email doesn't exist");

      const isValid = await compare(password, findUser.password);

      if (!isValid) throw new HttpException(500, "Incorrect password");

      const payload = {
        email: findUser.email,
        isVerified: findUser.isVerified,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: "1hr" });

      return token;
    } catch (err) {
      throw err;
    }
  };

  public refreshTokenAction = async (email: string) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser) throw new HttpException(500, "Something went wrong");

      const payload = {
        email: findUser.email,
        isVerified: findUser.isVerified,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: "1hr" });

      return token;
    } catch (err) {
      throw err;
    }
  };

  public verifyAction = async (email: string) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser) throw new HttpException(500, "Something went wrong");

      await this.authQuery.verifyQuery(findUser.email);
    } catch (err) {
      throw err;
    }
  };
}


// function generateRandomCode(length: number): string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }