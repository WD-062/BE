import { Router } from 'express';
import validateBody from '../middleware/validateBody.js';
import { bookSchema } from '../zod/schemas.js';
import { getAllBooks, createBook, getBookById, updateBook, deleteBook } from '../controllers/books.js';

const bookRouter = Router();

bookRouter.route('/').get(getAllBooks).post(validateBody(bookSchema), createBook);

bookRouter.route('/:id').get(getBookById).put(validateBody(bookSchema), updateBook).delete(deleteBook);

export default bookRouter;
