const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");
exports.authentication = async (req, res, next) => {
  try {
    // access_toke

    const payload = verifyToken(req.headers.access_token);

    if (payload) {
      const user = await User.findByPk(payload.id);
      if (user) {
        req.user = payload;
        next();
      } else {
        throw { name: "unauthorize", code: 403 };
      }
    } else {
      throw { name: "login first", code: 403 };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.authoritation = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      next();
    } else {
      throw { name: "Forbidden", code: 403 };
    }
  } catch (error) {
    next(error);
  }
};
