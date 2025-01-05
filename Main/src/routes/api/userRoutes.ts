import { Router } from 'express';

const router = Router();

import {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).delete(deleteUserById);

export { router as userRoutes };