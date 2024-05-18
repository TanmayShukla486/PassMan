const express = require('express');
const connectDb = require('./utils/connectDb');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoute');
const passwordRouter = require('./routes/passwordRoute');
const otpRouter = require('./routes/otpRoute');
const cors = require('cors');

const server = express();
(async function () {
  await connectDb();
})();

server.use(express.json());
server.use(cors());
server.use('/password-api/users', userRouter);
server.use('/password-api/passwords', passwordRouter);
server.use('/password-api/otp', otpRouter);
server.use(errorHandler);

server.listen(3000, () => console.log('Server started'));
