const express = require('express')
const app = express()
const config = require('./utils/config');
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.get('/ping', (req,res) => {
  res.send('pong')
})

module.exports = app;