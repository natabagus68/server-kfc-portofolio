const bcrypt = require("bcryptjs");

exports.encryptPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 8);
};

exports.comparePassword = (plainPassword, encryptPassword) => {
  return bcrypt.compareSync(plainPassword, encryptPassword);
};
