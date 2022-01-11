const loginRouter = require('express').Router()
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { asyncHandler, authenticate } = require('../utils/middleware')
const { createError } = require('../utils/helperFunctions')


/**
 * Login with credentials to get a jsonwebtoken back with user details.
 * Token expires after one hour and bad logins are dealt with errors.
 */
loginRouter.post('/', asyncHandler(async(req,res,next) => {
  const { username, password } = req.body  
  if (!username || !password) {
    throw createError(401,"Username or Password missing")
  }
  const foundUser = await User.findOne({ username }, { username: 1, passwordHash: 1, name: 1 })
  if (!foundUser) {
    throw createError(401,"Username doesn't exist")
  }
  const validPassword = bcryptjs.compareSync(password, foundUser.passwordHash)
  if (!validPassword) {
    throw createError(401,"Login details are incorrect")
  }
  const token = jwt.sign(
    {
      username: foundUser.username,
      id: foundUser.id
    },
    process.env.SECRET,
    {
      expiresIn: "1h"
    }
  )
  res.cookie('token', token, { maxAge:1*60*60*1000, httpOnly:true })
  res.status(200).send({ username:foundUser.username, id:foundUser.id })
}))

/**
 * Check login token to access private routes on client side
 */
loginRouter.get('/', authenticate,asyncHandler((req,res,next) => {
  res.status(200).end()
}))

module.exports = loginRouter