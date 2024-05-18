const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcrypt');
const OTP = require('../models/otpModel');
const asyncHandler = require('express-async-handler');

const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_KEY,
    },
  })
);

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
  console.log(OTP);
  return OTP;
};

// @desc POST req for otp generation
// @route /password-api/otp/generate
// @access public
const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('Missing email. Cannot send otp');
  }
  const generatedOtp = generateOTP().toString();
  const hashedOTP = await bcrypt.hash(generatedOtp, 10);
  const mailSent = await transport.sendMail({
    to: email,
    from: 'tanmay.shukla629@gmail.com',
    subject: 'OTP for account verification',
    html: `<p>Kindly enter the otp : ${generatedOtp} for email verification. This otp is valid for 5 mins</p>`,
  });
  const createdOtp = await OTP.create({
    email,
    otp: hashedOTP,
  });
  res.status(200).json({
    generation: 'successful',
    message: 'Check your inbox (maybe spam folder) for the otp',
  });
});
// @desc POST req for otp verification
// @route /password-api/otp/generate
// @access public
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400);
    throw new Error('Missing data. Cannot verify');
  }
  const retrievedOTP = await OTP.findOne({ email });
  console.log(retrievedOTP);
  if (!retrievedOTP) {
    res.status(404);
    throw new Error('No valid OTP exists for the given email');
  }
  if (await bcrypt.compare(otp, retrievedOTP.otp)) {
    const deleted = await OTP.deleteOne(retrievedOTP);
    console.log(`delete otp: ${deleted}`);
    res.status(200).json({
      verification: 'successful',
      message: 'Email verified. You can now login',
    });
  } else {
    res.status(403).json({
      verification: 'failed',
      message: 'Verification failed. Retry',
    });
  }
});

module.exports = { sendOTP, verifyOTP };
