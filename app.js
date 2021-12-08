const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')
const app = express()

const { createError } = require('./utils/helperFunctions')

const usersRouter = require('./controllers/users')
const healthCheckRouter = require('./controllers/healthcheck')
const loginRouter = require('./controllers/login')
const favoriteDatesRouter = require('./controllers/favoriteDates')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})


app.use(cors())
app.use(express.json())

// logger for all requests
app.use(middleware.requestLogger)

// routers
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/favoritedates', favoriteDatesRouter)
app.use('/healthcheck', healthCheckRouter)


app.use((req,res,next) => {  
  next(createError(404,"Page not found"))
})

app.use((err,req,res,next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }
  res.status(err.status || 500).json({ error: err.message })
})


module.exports = app;