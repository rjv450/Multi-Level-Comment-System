import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import connectDB from './conifg/db.js';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRouter.js'
import commentRoutes from './routes/commentRouter.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
dotenv.config()
connectDB()
const app = express();
app.use(bodyParser.json());

const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: 'Too many comments created from this IP, please try again later.',
});

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(helmet());
app.use(errorHandler)

app.use('/api/auth', authRoutes);
app.use('/api/', commentLimiter, commentRoutes);

export default app;