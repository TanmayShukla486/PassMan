const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Cannot send otp without email'],
    },
    otp: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;
