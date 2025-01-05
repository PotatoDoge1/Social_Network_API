import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
//import { userThoughts } from './thoughts-routes.ts';

const router = Router();

router.use('/users', userRoutes);

// api/users/
//router.use('/users', userRoutes);
//router.use('/thoughts', thoughtsRoutes);

export default router;