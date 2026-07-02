import express from 'express';
import { authUser, registerAdmin, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerAdmin);
router.get('/profile', protect, getUserProfile);

export default router;
