import { Thoughts, User } from '../models/index.js';
import { Request, Response } from 'express';

// create a thought
export const createThought = async(req: Request, res: Response) => {
    try{
        const thought = await Thoughts.create(req.body);

        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );

        if (!user){
            return res.status(404).json({ message: 'User not found.'});
        }

        if (!thought){
            return res.status(404).json({ message: 'No thought found.'});
        }

        return res.json(thought);

    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// get thoughts
export const getThoughts = async(_req: Request, res: Response) => {
    try {
        const allThoughts = await Thoughts.find();

        if(!allThoughts) {
            return res.status(404).json({ message: 'No thoughts found.' });
        }
        
        return res.json(allThoughts);
    } catch(error) {
        console.log("Error getting thoughts.");
        return res.status(500).json(error);
    }
}

// delete a thought
export const deleteThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

        if(!thought) {
            return res.status(404).json({ message: 'No thought found.' });
        }

    return res.json({ message: `${thought.thoughtContent} was deleted.`})

    } catch(error) {
        console.log("Error deleting thought.");
        return res.status(500).json(error);
    }
}

// get a thought by Id
export const getThoughtById = async(req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOne({ _id: req.params.thoughtId });

        if(!thought) {
            return res.status(404).json({ message: 'No thought found.' });
        }

    return res.json(thought);

    } catch(error) {
        console.log("Error getting thought.");
        return res.status(500).json(error);
    }
}

// update a thought by Id
export const updateThoughtById = async(req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            {
                runValidators: true,
                new: true
            }
        );

        if(!thought) {
            return res.status(404).json({ message: 'No thought with this Id.' });
        }

        return res.json(thought);

    } catch(error) {
        console.log("Error updating thought.");
        return res.status(500).json(error);
    }
}

// add a reaction to a thought
export const addReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        );

    return res.json(thought);

    } catch(error) {
        console.log("Error adding reaction.");
        return res.status(500).json(error);
    }
}

// delete a reaction to a thought
export const deleteReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        );

    return res.json(thought);

    } catch(error) {
        console.log("Error adding reaction.");
        return res.status(500).json(error);
    }
}