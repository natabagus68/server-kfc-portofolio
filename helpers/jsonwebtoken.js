const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_TOKEN);
};
