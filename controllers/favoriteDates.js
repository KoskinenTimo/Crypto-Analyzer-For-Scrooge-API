const favoriteDatesRouter = require('express').Router()
const { authenticate, asyncHandler } = require('../utils/middleware')
const FavoriteDate = require('../models/favoriteDate')
const { createError } = require('../utils/helperFunctions')
const { findOne, findById } = require('../models/favoriteDate')


/**
 * GET all favorite dates from DB
 */
favoriteDatesRouter.get('/', asyncHandler(async(req,res) => {
  const favDates = await FavoriteDate.find({})
  if (favDates && favDates.length) {
    const jsonFavDates = favDates.map(date => date.toJSON())
    return res.json(jsonFavDates)
  }
  res.json(favDates)
}))

/**
 * POST one favorite date to DB
 */
favoriteDatesRouter.post('/', authenticate,asyncHandler(async(req,res) => {
  const favoriteDate = req.body
  if (!favoriteDate) {
    throw createError(400,"Missing date data in request")
  }
  const newfavoriteDate = new FavoriteDate({
    user: req.currentUser.id,
    ...favoriteDate
  })
  const savedFavoriteDate = await newfavoriteDate.save()
  res.status(201).json(savedFavoriteDate)
}))

/**
 * GET one favorite date from DB
 */
favoriteDatesRouter.get('/:id', asyncHandler(async(req,res) => {
  const { id } = req.params
  const { currentUser } = req
  const favDate = await FavoriteDate.findById(id)
  if (favDate) {
    return res.json(favDate)
  }
  throw createError(404, "Nothing found with the id")
}))

/**
 * UPDATE one favorite date in DB (NOT READY)
 */
favoriteDatesRouter.put('/:id', authenticate,asyncHandler(async(req,res) => {
  res.status(201).end()
}))

/**
 * DELETE UPDATE one favorite date in DB
 */
favoriteDatesRouter.delete('/:id', authenticate,asyncHandler(async(req,res) => {
  const { id } = req.params
  const { currentUser } = req
  const favDate = await FavoriteDate.findById(id)
  if (favDate) {
    console.log(currentUser.id);
    console.log(favDate.user.toString());
    if (currentUser.id === favDate.user.toString()) {
      const deleted = await FavoriteDate.findByIdAndRemove(id)
      if (deleted) {
        return res.status(204).end()
      }
      throw createError(404, "Nothing found with the id")
    }
    throw createError(401, "Not the owner of this recourse, access denied")
  }
  throw createError(404, "Nothing found with the id")
}))


module.exports = favoriteDatesRouter