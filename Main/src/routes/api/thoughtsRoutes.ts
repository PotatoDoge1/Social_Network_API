import { Router } from 'express';

const router = Router();

import {
    createThought,
    getThoughts,
    deleteThought,
    getThoughtById,
    updateThoughtById
} from '../../controllers/thoughtsController.js';

// /api/thoughts
router.route('/').post(createThought).get(getThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').delete(deleteThought).get(getThoughtById).put(updateThoughtById);

export { router as thoughtsRoutes };