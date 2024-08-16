
import { check, validationResult } from 'express-validator';

export const registerValidator = [
    check('username')
        .notEmpty()
        .withMessage('Username is required.'),

    check('email')
        .isEmail()
        .withMessage('Invalid email address format')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email is required.'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .matches(/\d/)
        .withMessage('Password must contain a number.')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter.')
        .notEmpty()
        .withMessage('Password is required.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


export const loginValidator = [
    check('email')
        .isEmail()
        .withMessage('Invalid email address format')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email is required'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];