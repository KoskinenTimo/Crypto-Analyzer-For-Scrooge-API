const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Username must be atleast 5 characters long"],
    maxLength: [15, "Username can be max 15 characters long"]
  },
  passwordHash: String,
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name must be atleast 2 characters long"],
    maxLength: [20, "Name can be max 20 characters long"]
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favorite'
    }
  ]
})

userSchema.plugin(uniqueValidator, { message:"Username already exists" })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;