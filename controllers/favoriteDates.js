const favoriteDatesRouter = require('express').Router()
const { authenticate, asyncHandler } = require('../utils/middleware')


/**
 * GET all favorite dates from DB (NOT READY)
 */
favoriteDatesRouter.get('/', asyncHandler(async(req,res) => {
  res.status(200).end()
}))

/**
 * POST one favorite date to DB (NOT READY)
 */
favoriteDatesRouter.post('/', authenticate,asyncHandler(async(req,res) => {
  res.status(201).end()
}))

/**
 * GET one favorite date from DB (NOT READY)
 */
favoriteDatesRouter.get('/:id', asyncHandler(async(req,res) => {
  res.status(200).end()
}))

/**
 * UPDATE one favorite date in DB (NOT READY)
 */
favoriteDatesRouter.put('/:id', authenticate,asyncHandler(async(req,res) => {
  res.status(204).end()
}))

/**
 * DELETE UPDATE one favorite date in DB (NOT READY)
 */
favoriteDatesRouter.delete('/:id', authenticate,asyncHandler(async(req,res) => {
  res.status(204).end()
}))


module.exports = favoriteDatesRouter