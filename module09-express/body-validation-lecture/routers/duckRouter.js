import { Router } from 'express';
import { getAllDucks, createDuck, getDuckById, updateDuck, deleteDuck } from '../controllers/ducks.js';
import validateBody from '../middlewares/validateBody.js';

const duckMiddleware = (req, res, next) => {
  console.log('I only appear on the duck routes!');
  next();
};

const verifyToken = (req, res, next) => {
  //token verification logic here...

  req.userId = 1;

  next();
};

const duckRouter = Router();
duckRouter.use(duckMiddleware);

duckRouter.route('/').get(getAllDucks).post(validateBody('duck'), createDuck);

duckRouter.route('/:id').get(getDuckById).put(verifyToken, validateBody('duck'), updateDuck).delete(deleteDuck);

export default duckRouter;
