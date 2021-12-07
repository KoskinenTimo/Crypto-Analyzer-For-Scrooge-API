const healthCheckRouter = require('express').Router()

/**
 * Simple healthcheck for the API
 */
healthCheckRouter.get('/', (req,res) => {    
  res.status(200).end()
})

/**
 * Test changes from nodemon to container
 */
healthCheckRouter.get('/ping', (req,res) => {
  res.status(200).send("pong")
})

module.exports = healthCheckRouter