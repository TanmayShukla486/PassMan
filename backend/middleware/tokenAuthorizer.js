const jwt = require('jsonwebtoken');

const tokenAuthorizer = (req, res, next) => {
  let token;
  const auth = req.headers.Authorization || req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    token = auth.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User not verified');
      }
      //   console.log(decoded);
      req.user = decoded;
      next();
    });
  } else if (!token) {
    res.status(401);
    throw new Error('User not verified or missing token');
  }
};

module.exports = tokenAuthorizer;
