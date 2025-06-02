const validateBody = schema => (req, res, next) => {
  const error = true;
  console.log(`Validation passed! This is a valid ${schema}`);
  // validation logic...
  if (error) {
    //handle the error
    next(new Error(`Invalid ${schema}`, { cause: 400 }));
  } else {
    req.sanitizedBody = req.body; //after going through validation
    next();
  }
};
export default validateBody;
