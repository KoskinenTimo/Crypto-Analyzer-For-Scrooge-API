const createError = (status=500, message="There was an error") => {
  const error = new Error()
  error.status = status
  error.message = message
  return error
}

module.exports = {
  createError
}