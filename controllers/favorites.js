const favoritesRouter = require('express').Router()
const { authenticate, asyncHandler } = require('../utils/middleware')
const Favorite = require('../models/favorite')
const { createError } = require('../utils/helperFunctions')
const { findOne, findById, findByIdAndUpdate } = require('../models/favorite')
const User = require('../models/user')
const { json } = require('body-parser')


/**
 * GET all favorite dates from DB
 */
favoritesRouter.get('/', asyncHandler(async(req,res) => {
  const favDates = await Favorite
    .find({})
    .populate('user', { username:1, name:1 })
  if (favDates && favDates.length) {
    const jsonFavDates = favDates.map(date => date.toJSON())
    return res.json(jsonFavDates)
  }
  res.json(favDates)
}))

/**
 * POST one favorite date to DB
 */
favoritesRouter.post('/', authenticate,asyncHandler(async(req,res) => {
  const favorite = req.body
  if (!favorite) {
    throw createError(400,"Missing favorite data in request")
  }
  const newfavoriteDate = new Favorite({
    user: req.currentUser.id,
    ...favorite
  })
  const savedFavoriteDate = await newfavoriteDate
    .save()
    .then(fav => fav
      .populate('user', { username:1, name:1 }))
  if (savedFavoriteDate) {
    const foundUser = await User.findById(req.currentUser.id)
    foundUser.favorites.push(savedFavoriteDate.id)
    await User.findByIdAndUpdate(req.currentUser.id,{ favorites:foundUser.favorites })
    return res.status(201).json(savedFavoriteDate)
  }
  throw createError(500,"Something went wrong when saving to database")
}))

/**
 * GET one favorite date from DB
 */
favoritesRouter.get('/:id', asyncHandler(async(req,res) => {
  const { id } = req.params
  const { currentUser } = req
  const favDate = await Favorite.findById(id)
  if (favDate) {
    return res.json(favDate)
  }
  throw createError(404, "Nothing found with the id")
}))

/**
 * UPDATE one favorite date in DB (NOT READY)
 */
favoritesRouter.put('/:id', authenticate,asyncHandler(async(req,res) => {
  const { id } = req.params
  const { currentUser, body } = req
  const favDate = await Favorite.findById(id)
  if (favDate) {
    if (currentUser.id === favDate.user.toString()) {
      const updatedFav = await Favorite.findByIdAndUpdate(id, body, { runValidators:true, new:true })
      if (updatedFav) {
        return res.status(200).json(updatedFav)
      }
      throw createError(404, "Nothing found with the id")
    }
    throw createError(401, "Not the owner of this recourse, access denied")
  }
  throw createError(404, "Nothing found with the id")
}))

/**
 * DELETE one favorite date in DB
 */
favoritesRouter.delete('/:id', authenticate,asyncHandler(async(req,res) => {
  const { id } = req.params
  const { currentUser } = req
  const favDate = await Favorite.findById(id)
  if (favDate) {
    if (currentUser.id === favDate.user.toString()) {
      const deleted = await Favorite.findByIdAndRemove(id)
      if (deleted) {
        return res.status(204).end()
      }
      throw createError(404, "Nothing found with the id")
    }
    throw createError(401, "Not the owner of this recourse, access denied")
  }
  throw createError(404, "Nothing found with the id")
}))


module.exports = favoritesRouter