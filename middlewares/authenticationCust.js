const { verifyToken } = require("../helpers/jsonwebtoken");
const { Customer } = require("../models");
exports.authenticationCus = async (req, res, next) => {
  try {
    const payload = verifyToken(req.headers.access_token);
    if (payload) {
      const cust = await Customer.findByPk(payload.id);
      if (cust) {
        req.customer = cust;
        next();
      } else {
        throw { name: "unauthorize", code: 403 };
      }
    } else {
      throw { name: "login first", code: 403 };
    }
  } catch (error) {
    next(error);
  }
};
