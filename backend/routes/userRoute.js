const express = require('express');
const {
  registerUser,
  loginUser,
  currentUser,
  deleteUser,
} = require('../controllers/userController');
const tokenAuthorizer = require('../middleware/tokenAuthorizer');

const router = express.Router();

router.route('/register').post(registerUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.route('/current').get(tokenAuthorizer, currentUser);

module.exports = router;
