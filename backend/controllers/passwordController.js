const asyncHandler = require('express-async-handler');
const Password = require('../models/passwordModel');

// @desc GET all passwords
// @route: /password-api/passwords/
// @access: private
const getAllPasswords = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const retrievedContacts = await Password.find({ userId });
  if (retrievedContacts) {
    res.status(200).json({
      retrieval: 'successful',
      data: retrievedContacts,
    });
  } else {
    res.status(404).json({
      retrieval: 'unsuccesful',
      data: 'No passwords found or database retrieval failed',
    });
  }
});
// @desc POST a password
// @route: /password-api/passwords/
// @access: private
const addPassword = asyncHandler(async (req, res) => {
  const { website, username, email, password } = req.body;
  if (!website || !username || !email || !password) {
    res.status(400);
    throw new Error('Missing fields to create password');
  }
  const userId = req.user.id;
  const createdPassword = await Password.create({
    website: website,
    username: username,
    email: email,
    password: password,
    userId: userId,
  });
  if (createdPassword) {
    res.status(200).json({
      passwordCreation: 'successful',
      createdPassword,
    });
  } else {
    res.status(400);
    throw new Error('Error while creating password');
  }
});
// @desc DELETE a password
// @route: /password-api/passwords/;id
// @access: private
const removePassword = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400);
    throw new Error('Missing fields to create password');
  }
  const userId = req.user.id;
  const passwordToBeDeleted = await Password.findOne({
    userId: userId,
    _id: id,
  });
  if (!passwordToBeDeleted) {
    res.status(404);
    throw new Error("Password doesn't exist");
  }
  await Password.deleteOne({ _id: id });
  res.status(200).json({
    deletion: 'successful',
    deleted: passwordToBeDeleted,
  });
});
// @desc Uodate a password
// @route: /password-api/passwords/:id
// @access: private
// const updatePassword = asyncHandler(async (req, res) => {
//   const { website, username, email, password } = req.body;
//   if (!website || !username || !email || !password) {
//     res.status(400);
//     throw new Error('Missing fields to create password');
//   }
//   const userId = req.user.id;
//   const createdPassword = await Password.create({
//     website: website,
//     username: username,
//     email: email,
//     password: password,
//     userId: userId,
//   });
//   if (createdPassword) {
//     res.status(200).json({
//       passwordCreation: 'successful',
//       createdPassword,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Error while creating password');
//   }
// });

module.exports = { getAllPasswords, addPassword, removePassword };
