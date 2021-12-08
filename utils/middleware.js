const jwt = require('jsonwebtoken');
const { createError } = require('./helperFunctions');

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

const authenticate = async(req,res,next) => {
  const bearerToken = req.get('Authorization')
  if (bearerToken && bearerToken.toLowerCase().startsWith('bearer ')) {
    try {
      const token = bearerToken.substring(7)
      const authenticatedUser = jwt.verify(token,process.env.SECRET)
      req.currentUser = authenticatedUser
    } catch (error) {
      next(createError(401,"Access denied, bad credentials"))
    }
  } else {
    next(createError(401,"Authorization token missing or invalid"))
  }
  next()
}

module.exports = {
  requestLogger,
  asyncHandler,
  authenticate
}