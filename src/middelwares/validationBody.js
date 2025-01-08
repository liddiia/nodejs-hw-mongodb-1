import createError from "http-errors";

export const validationBody = schema => {
    const func = async (req, res, next) => {
      try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return next(createError(400, error.message));
  };
    };
    return func;
  };

