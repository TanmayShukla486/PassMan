const express = require('express');
const tokenAuthorizer = require('../middleware/tokenAuthorizer');
const {
  getAllPasswords,
  addPassword,
  removePassword,
} = require('../controllers/passwordController');
const router = express.Router();

router.use(tokenAuthorizer);
router.route('/').get(getAllPasswords).post(addPassword);
router.route('/delete').delete(removePassword);

module.exports = router;
