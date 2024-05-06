
import express, { Request, Response } from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();

router.post('/users', async (req: Request, res: Response) => {
    
    try {
        const newUser = await createUser(req, res);
        res.status(201).json({ user: newUser, message: "User Created Successfully" })
    } catch(error) {
        console.error('Error processing request', error);
        res.status(500).json({ success: false, message: 'Internal Server Error'})
    }
});

export default router;