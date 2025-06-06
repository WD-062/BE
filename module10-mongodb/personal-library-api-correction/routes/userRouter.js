import { Router } from 'express';
import validateBody from '../middleware/validateBody.js';
import { userSchema, readingListSchema } from '../zod/schemas.js';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addBookToList,
  updateBookInList,
  removeBookFromList
} from '../controllers/users.js';

const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(validateBody(userSchema), createUser);

userRouter.route('/:id').get(getUserById).put(validateBody(userSchema), updateUser).delete(deleteUser);

userRouter.route('/:id/books').post(validateBody(readingListSchema), addBookToList);

userRouter
  .route('/:id/books/:bookId')
  .put(validateBody(readingListSchema.omit({ bookRefId: true })), updateBookInList)
  .delete(removeBookFromList);

export default userRouter;
