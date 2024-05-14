const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.CONNECTION_STRING.replace(/<password>/, process.env.PASSWORD)
    );
    console.log(`Database connected at ${connect.connection.models}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
