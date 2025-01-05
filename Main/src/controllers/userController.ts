import { Request, Response } from  'express';
import { User /*Thoughts*/ } from '../models/index.js';

// create a user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.log('Error creating user.');
        res.status(500).json(error);
    }
}

// get all users
export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const allUsers = await User.find();
        return res.json(allUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}