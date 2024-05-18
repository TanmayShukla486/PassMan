const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/otpController');

const router = express.Router();

router.route('/generate').post(sendOTP);
router.route('/verify').post(verifyOTP);

module.exports = router;
