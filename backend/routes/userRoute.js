const express = require('express');
const {
  registerUser,
  loginUser,
  currentUser,
} = require('../controllers/userController');
const tokenAuthorizer = require('../middleware/tokenAuthorizer');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current').get(tokenAuthorizer, currentUser);

module.exports = router;
