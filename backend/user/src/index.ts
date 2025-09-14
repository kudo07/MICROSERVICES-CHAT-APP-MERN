import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import { connectRabbitMQ } from './config/rabbitmq.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';
dotenv.config();

connectDb();

connectRabbitMQ();

export const redisClient = createClient({
  url: process.env.REDIS_URL as string,
});

redisClient
  .connect()
  .then(() => console.log('connected to the redis'))
  .catch(console.error);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Serverrrrrrrr is running on port ${port}`);
});
