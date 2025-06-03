import express from 'express';
import duckRouter from './routers/duckRouter.js';
import userRouter from './routers/userRouter.js';
import './db/associations.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = 3000;

//incoming request will have a JSON body
app.use(express.json());
app.get('/', (req, res) => {
  throw new Error('We did something wrong');
});

app.use('/ducks', duckRouter);
app.use('/users', userRouter);

app.use('/*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
