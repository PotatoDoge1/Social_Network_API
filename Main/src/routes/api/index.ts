import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
import { thoughtsRoutes } from './thoughtsRoutes.js';

const router = Router();

// api/users
router.use('/users', userRoutes);

// api/thoughts
router.use('/thoughts', thoughtsRoutes);

export default router;