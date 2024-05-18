const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// @desc Register a user
// @access public
// @route: /password-api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Missing data or fields');
  }
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({ username });
  if (existingUser) {
    res.status(403);
    throw new Error('Email already in use');
  }
  if (existingUserName) {
    res.status(403);
    throw new Error('Username already in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json({
    userRegistered: true,
    data: {
      username: newUser.username,
      email: newUser.email,
    },
  });
});

// @desc Login A User
// @route: /password-api/users/login
// @access: public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Missing Fields');
  }
  const retrievedUser = await User.findOne({ email });
  if (
    retrievedUser &&
    (await bcrypt.compare(password, retrievedUser.password))
  ) {
    const accessToken = jwt.sign(
      {
        username: retrievedUser.username,
        email: retrievedUser.email,
        id: retrievedUser.id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '12m',
      }
    );
    res.status(200).json({
      username: retrievedUser.username,
      email: retrievedUser.email,
      authToken: accessToken,
    });
  } else {
    res.status(400);
    throw new Error('Invalid password or email');
  }
});
// @desc Get current user data
// @route: /password-api/users/current
// @access: private
const currentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    loggedIn: true,
    user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('Missing field. Cannot delete user');
  }
  const userToBeDeleted = await User.findOne({ email });
  if (!userToBeDeleted) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  await User.deleteOne(userToBeDeleted);
  res.status(200).json({
    deletion: 'successful',
    userDeleted: userToBeDeleted,
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  deleteUser,
};
