import express from 'express';
import duckRouter from './routers/duckRouter.js';
import userRouter from './routers/userRouter.js';
// side effect of connecting to database
// import './db/index.js';
import './db/associations.js';

const app = express();
const port = 3000;

//incoming request will have a JSON body
app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/ducks', duckRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
