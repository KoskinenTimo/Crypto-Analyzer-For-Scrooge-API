const usersRouter = require('express').Router()
const { asyncHandler, authenticate } = require('../utils/middleware')
const { createError } = require('../utils/helperFunctions')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')


/**
 * GET all user from DB
 */
usersRouter.get('/', asyncHandler(async(req,res) => {
  const users = await User
    .find({})
    .populate('favorites', { fromDate:1, toDate:1, coin:1, currency:1 })
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

/**
 * GET one user from DB
 */
usersRouter.get('/:id', authenticate,asyncHandler(async(req,res) => {
  const { currentUser } = req
  if (req.params.id === req.currentUser.id) {
    const userWithDetails = await User.findById(currentUser.id)
      .populate('favorites', 
        {
          fromDate:1,
          toDate:1,
          coin:1,
          currency:1,
          profit:1,
          volume:1, 
          note:1
        })
    return res.status(200).json(userWithDetails)
  }
  next(createError(401, "Access denied, not the owner of these records"))
}))


module.exports = usersRouter