require('dotenv').config();

let PORT = process.env.PORT || 3001
let MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.DEV_MONGODB_URI
}
if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.MONGODB_URI
}

module.exports = {
  PORT,
  MONGODB_URI  
}