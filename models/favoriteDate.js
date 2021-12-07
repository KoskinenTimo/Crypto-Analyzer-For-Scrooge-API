const mongoose = require('mongoose')

favoriteDateSchema = mongoose.Schema({
  fromDate: {
    type: Number,
    required: [ true, "fromDate is required"]
  },
  toDate: {
    type: Number,
    required: [ true, "toDate is required"]
  },
  note: {
    type: String,
    minLength: [ 2, "Min length for note is 2 characters"],
    maxLength: [ 200, "Max length for note is 200 characters"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})