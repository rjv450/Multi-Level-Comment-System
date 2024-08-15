import express from 'express';

import {
  createComment,
  replyToComment,
  getComments,
  expandComments
} from '../controllers/commentController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/posts/:postId/comments', authenticateToken, createComment);
router.post('/posts/:postId/comments/:commentId/reply', authenticateToken, replyToComment);
router.get('/posts/:postId/comments', getComments);
router.get('/posts/:postId/comments/:commentId/expand', expandComments);

export default router;
