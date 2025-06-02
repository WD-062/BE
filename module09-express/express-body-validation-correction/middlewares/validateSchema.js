import { z } from 'zod/v4';
const validateSchema = zodSchema => (req, res, next) => {
  // validation logic...
  const { error, data } = zodSchema.safeParse(req.body);
  if (error) {
    //handle the error
    const prettyError = z.prettifyError(error);

    next(new Error(prettyError, { cause: 400 }));
  } else {
    console.log(data);
    req.sanitizedBody = data; //after going through validation
    next();
  }
};
export default validateSchema;
