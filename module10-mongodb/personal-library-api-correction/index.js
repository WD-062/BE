import express from 'express';
import './db/index.js';
import errorHandler from './middleware/errorHandler.js';
import bookRouter from './routes/bookRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/books', bookRouter);
app.use('/users', userRouter);

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
