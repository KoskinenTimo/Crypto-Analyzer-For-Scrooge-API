const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const asyncHandler = (callback) => {
  return async(req,res,next) => {
    try {
      await callback(req,res,next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  requestLogger,
  asyncHandler
}