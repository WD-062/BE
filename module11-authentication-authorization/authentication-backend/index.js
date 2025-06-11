import express from 'express';
import './db/index.js';
import duckRouter from './routers/duckRouter.js';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

//incoming request will have a JSON body
app.use(express.json());

app.use('/ducks', duckRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
