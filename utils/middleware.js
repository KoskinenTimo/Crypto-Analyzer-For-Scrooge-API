const jwt = require('jsonwebtoken');
const { createError } = require('./helperFunctions');

/**
 * Basic logging for all the incoming requests, self explanatory details below.
 */
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

/**
 * Wraps the callback function in try catch blocks. This middleware can be
 * injected directly to routes where they are needed.
 * @param {function} callback
 */
const asyncHandler = (callback) => {
  return async(req,res,next) => {
    try {
      await callback(req,res,next)
    } catch (error) {
      next(error)
    }
  }
}

/**
 * Authenticates the user with credentials provided in auth cookie. If
 * it is succesful, creates currentUser property with username and id properties
 * inside in req object and in the case of unsuccesful auth attempt, 
 * uses next to send error to be handled.
 */
const authenticate = async(req,res,next) => {
  const { token } = req.cookies
  if (token) {
    try {
      const authenticatedUser = jwt.verify(token,process.env.SECRET)
      req.currentUser = authenticatedUser
    } catch (error) {
      next(createError(401,"Access denied, bad credentials"))
    }
  } else {
    next(createError(401,"Authorization cookie missing or invalid"))
  }
  next()
}

module.exports = {
  requestLogger,
  asyncHandler,
  authenticate
}