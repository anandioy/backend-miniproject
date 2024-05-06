import { db } from "../../prisma/client";
import { Request, Response } from "express";
import { hash } from 'bcrypt';
import * as z from 'zod';

function generateRandomCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    phone: z.string().min(1, 'Phone is required'),
    image: z.string().min(1, 'Image is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });


export async function createUser(req: Request, res: Response) {
    try {
        
        const body = await req.body();
        const { email, username, password, phone, image } = userSchema.parse(req.body);

        const existingUserByEmail = await db.user.findUnique({
            where: {email: email}
        });
         
        if(existingUserByEmail) {
            return res.status(409).json({ user: null, message: "User with this email already exists"})
        }

        const existingUserByUsername = await db.user.findUnique({
            where: { username: username } as any
        });

        if(existingUserByUsername) {
            return res.status(409).json({ user: null, message: "User with this username already exists"})
        }

        const hashedPassword = await hash(password, 10);

        const referralcode = generateRandomCode(8);

        const newUser = await db.$transaction([db.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                phone: phone,
                image: image,
                referralcode: referralcode,
                redeemedPoints: 0
            }
        })
        ])

        return res.status(201).json({ user: newUser, message: "User Created Successfully"});
    } catch(error) {
        console.error('Error Processing Request', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error'});
    }
}