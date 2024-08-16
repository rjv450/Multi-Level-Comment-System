import express from 'express';

import {
  createComment,
  replyToComment,
  getComments,
  expandComments
} from '../controllers/commentController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import { createCommentValidator, replyCommentValidator } from '../utils/validators/commentValidator.js';

const router = express.Router();

router.post('/posts/:postId/comments', authenticateToken, createCommentValidator,createComment);
router.post('/posts/:postId/comments/:commentId/reply', authenticateToken,replyCommentValidator, replyToComment);
router.get('/posts/:postId/comments', getComments);
router.get('/posts/:postId/comments/:commentId/expand', expandComments);

export default router;
