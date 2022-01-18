const mongoose = require('mongoose');
const { coins } = require('../utils/constants');
const { createError } = require('../utils/helperFunctions');


const favoriteSchema = mongoose.Schema({
  fromDate: {
    type: Date,
    required: [ true, "fromDate is required"]
  },
  toDate: {
    type: Date,
    required: [ true, "toDate is required"]
  },
  coin: {
    type: String,
    required: [ true, "Crypto coin is required"]
  },
  currency: {
    type: String,
    required: [ true, "Currency is required"]
  },
  profit: {
    type: Number,
  },
  volume: {
    type: Number
  },
  note: {
    type: String,
    minLength: [ 2, "Min length for note is 2 characters"],
    maxLength: [ 200, "Max length for note is 200 characters"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, "User ID associated is required to add favorites" ]
  }
})


favoriteSchema.pre('validate', function(next) {
  if (Boolean(Number(this.fromDate)) && Boolean(Number(this.toDate))) {
    this.fromDate = this.fromDate*1000
    this.toDate = this.toDate*1000
  } else {
    next(createError(400,"Dates must be UNIX timestamps"))
  }
  if (this.fromDate > this.toDate) {    
    next(createError(400,"To Date must be greater than From Date"))
  }
  if (this.fromDate < new Date(0)) {
    next(createError(400,"From Date must be greater than 1970-01-01"))
  }
  if (this.fromDate > new Date() || this.toDate > new Date()) {
    next(createError(400,"Dates cannot be in the future from current day"))
  }
  if (!['eur','usd','gbp'].includes(this.currency)) {
    next(createError(400,"Currency must be 'eur', 'usd' or 'gbp'"))
  }
  const coinIds = coins.map(coin => coin.id)
  if (!coinIds.includes(this.coin)) {
    next(createError(400,`Coin must be on of the following ${coinIds}`))
  }
  next()
})



favoriteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite