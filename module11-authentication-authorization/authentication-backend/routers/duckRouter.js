import { Router } from 'express';
import { getAllDucks, createDuck, getDuckById, updateDuck, deleteDuck } from '../controllers/ducks.js';
import verifyToken from '../middlewares/verifyToken.js';
import validateBody from '../middlewares/validateBody.js';
import { duckSchema } from '../zod/schemas.js';
const duckRouter = Router();

duckRouter.route('/').get(getAllDucks).post(verifyToken, validateBody(duckSchema), createDuck);

duckRouter
  .route('/:id')
  .get(getDuckById)
  .put(verifyToken, validateBody(duckSchema.omit({ owner: true })), updateDuck)
  .delete(verifyToken, deleteDuck);

export default duckRouter;
