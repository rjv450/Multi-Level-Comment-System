
import { check, validationResult } from 'express-validator';

export const createCommentValidator = [
  check('postId')
    .isNumeric()
    .withMessage('Post ID must be a number')
    .notEmpty()
    .withMessage('Post ID is required'),
  
  check('text')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Comment text cannot be empty if provided'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const replyCommentValidator = [
    check('postId')
      .isNumeric()
      .withMessage('Post ID must be a number')
      .notEmpty()
      .withMessage('Post ID is required'),
  
    check('commentId')
      .isMongoId() 
      .withMessage('Invalid comment ID format')
      .notEmpty()
      .withMessage('Comment ID is required'),
  
    check('text')
      .optional()
      .isLength({ min: 1 })
      .withMessage('Comment text cannot be empty if provided'),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];