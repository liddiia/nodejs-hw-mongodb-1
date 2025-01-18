export const handleSaveError = (error, doc, next) => {
  const { name, code } = error;

  error.status = (name === 'Mongo ServerError' && code === 11000) ? 400 : 409;

  next();
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
