import { Router } from 'express';
import { signup, signin, me } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import verifyToken from '../middlewares/verifyToken.js';
import { userSchema, signinSchema } from '../zod/schemas.js';

const authRouter = Router();

authRouter.route('/signup').post(validateBody(userSchema), signup);

authRouter.route('/signin').post(validateBody(signinSchema), signin);

authRouter.route('/me').get(verifyToken, me);

export default authRouter;
