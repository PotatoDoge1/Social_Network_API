import { Router } from 'express';

const router = Router();

import {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).delete(deleteUserById).put(updateUserById);

// /api/users/friends/:userId/:friendId
router.route('/friends/:userId/:friendId').post(addFriend).delete(deleteFriend)

export { router as userRoutes };