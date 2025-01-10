import { Request, Response } from  'express';
import { User /*Thoughts*/ } from '../models/index.js';

// create a user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch(error) {
        console.log('Error creating user.');
        return res.status(500).json(error);
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

// get a user by userId
export const getUserById = async(req: Request, res: Response) => {
    try {
        const userData = await User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts');
        if (userData) {
            return res.json(userData);
        } else {
            return res.status(404).json({ message: 'User not found.'});
        }

    } catch(error) {
        console.log("Error getting user by ID.");
        return res.status(500).json(error);
    }
}

// delete a user
export const deleteUserById = async(req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if(!user) {
            return res.status(404).json({ message: 'No users found.'});
        }

        return res.json({ message: `${user.username} was deleted.`});

    } catch(error) {
        console.log("Error deleting user by ID.");
        return res.status(500).json(error);
    }
}

// update a user
export const updateUserById = async(req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                runValidators: true,
                new: true
            }
        )

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID.'});
        }

        return res.json(user);

    } catch (error) {
        console.log("Error updating user by ID.");
        return res.status(500).json(error);
    }
}

// add friend
export const addFriend = async(req: Request, res: Response) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "Error adding friend." });
        }

        return res.json(userData);
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// delete friend
export const deleteFriend = async(req: Request, res: Response) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "Error deleting friend." });
        }

        return res.json(userData);
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}