const express = require('express');
const tokenAuthorizer = require('../middleware/tokenAuthorizer');
const {
  getAllPasswords,
  addPassword,
  removePassword,
} = require('../controllers/passwordController');
const router = express.Router();

router.use(tokenAuthorizer);
router.route('/passwords').get(getAllPasswords).post(addPassword);
router.route('/passwords/:id').delete(removePassword);

module.exports = router;
