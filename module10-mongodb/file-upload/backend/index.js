import express from 'express';
import cors from 'cors';
import './db/index.js';
import userRouter from './routers/userRouter.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use('/users', userRouter);

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
