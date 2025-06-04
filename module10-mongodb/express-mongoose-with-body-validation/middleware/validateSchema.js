import { z } from 'zod/v4';
const validateSchema = zodSchema => (req, res, next) => {
  const { error, data } = zodSchema.safeParse(req.body);
  if (error) {
    const prettyError = z.prettifyError(error);

    next(new Error(prettyError, { cause: 400 }));
  } else {
    req.sanitizedBody = data;
    next();
  }
};
export default validateSchema;
