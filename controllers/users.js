const usersRouter = require('express').Router()
const { asyncHandler } = require('../utils/middleware')
const { createError } = require('../utils/helperFunctions')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')


/**
 * GET all user from DB
 */
usersRouter.get('/', asyncHandler(async(req,res) => {
  const users = await User.find({})
  if (users && users.length) {
    const jsonUsers = users.map(user => user.toJSON())
    return res.json(jsonUsers)
  } 
  res.json(users)
}))

/**
 * POST one use to DB
 */
usersRouter.post('/', asyncHandler(async(req,res) => {
  const { username, password, name } = req.body
  if (password.length < 7) {
    throw createError(400,"Password must be atleast 7 characters long")
  }
  const salt = bcryptjs.genSaltSync(10)
  const passwordHash = bcryptjs.hashSync(password,salt)
  const user = new User({
    username,
    passwordHash,
    name
  })
  const savedUsed = await user.save()
  res.status(201).json(savedUsed)
}))

module.exports = usersRouter