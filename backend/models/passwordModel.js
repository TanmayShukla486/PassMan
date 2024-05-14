const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  website: {
    type: String,
    required: [true, 'A website is needed for a password'],
  },
  username: {
    type: String,
    required: [true, 'A username is needed to map passwords'],
  },
  email: {
    type: String,
    required: [true, 'An email is needed'],
  },
  password: {
    type: String,
    required: [true, 'A password is mandatory'],
  },
});

const Password = mongoose.model('Password', passwordSchema);
module.exports = Password;
