import { Router } from 'express';

const router = Router();

import {
    createThought,
    getThoughts,
    deleteThought,
    getThoughtById,
    updateThoughtById,
    addReaction,
    deleteReaction
} from '../../controllers/thoughtsController.js';

// /api/thoughts
router.route('/').post(createThought).get(getThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').delete(deleteThought).get(getThoughtById).put(updateThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

export { router as thoughtsRoutes };