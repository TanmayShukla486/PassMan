const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'A username is required for a profile'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'An email is mandatory'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A password is mandatory'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
