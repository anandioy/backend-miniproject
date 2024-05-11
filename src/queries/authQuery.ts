import { db } from "../../prisma/client";
import { Service } from "typedi";
import * as handlebars from "handlebars";
import path from "path";
import fs from "fs";
import { sign } from "jsonwebtoken";

import { User } from "@/interfaces/userInterface";
import { transporter } from "../helpers/nodemailer";
import { FE_URL, API_KEY } from "@/config";

@Service()
export class AuthQuery {
  private sendRegistrationEmail = async (user: User) => {
    try {
      const payload = {
        email: user.email,
        isVerified: user.isVerified,
      };

      const token = sign(payload, String(API_KEY), {
        expiresIn: "1hr",
      });
      
      const templatePath = path.join(
        __dirname,
        "../templates",
        "registrationEmail.hbs"
      );
      const urlVerify = `${FE_URL}/verify?token=${token}`;
      const templateSource = fs.readFileSync(templatePath, "utf-8");

      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
        email: user.email,
        url: urlVerify,
      });

      await transporter.sendMail({
        from: "sender address",
        to: user.email,
        subject: "Welcome to Festive",
        html,
      });
    } catch (err) {
      throw err;
    }
  };

  public registerQuery = async (
    fullname: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    // image: string,
    referralcode: string,
    // redeemedPoints: number
  ): Promise<User> => {
    try {
      const t = await db.$transaction(async (db) => {
        try {
          const user = await db.user.create({
            data: {
              fullname,
              email,
              password,
              phone,
              referralcode,
              address,
              // image,
              // redeemedPoints,
              isVerified: false,
            },
          });

          await this.sendRegistrationEmail(user);

          return user;
        } catch (err) {
          throw err;
        }
      });

      return t;
    } catch (err) {
      throw err;
    }
  };

  public verifyQuery = async (email: string): Promise<void> => {
    try {
      await db.$transaction(async (db) => {
        try {
          await db.user.update({
            data: {
              isVerified: true,
            },
            where: { email },
          });
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      throw err;
    }
  };
}
