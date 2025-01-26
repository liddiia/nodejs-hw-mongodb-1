import createError from "http-errors";

export const validationBody = schema => {
    const func = async (req, res, next) => {
      try {
        const dataToValidate = req.file
        ? { ...req.body, photo: req.file }: req.body;
    await schema.validateAsync(dataToValidate, { abortEarly: false });
    next();
  }
  catch (error) {
    return next(createError(400, error.message));
  };
    };
    return func;
  };

