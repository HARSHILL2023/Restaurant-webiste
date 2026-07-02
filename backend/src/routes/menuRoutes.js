import express from 'express';
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getMenu)
  .post(protect, admin, upload.single('image'), createMenuItem);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateMenuItem)
  .delete(protect, admin, deleteMenuItem);

export default router;
