const { User } = require("../../models");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, phone, address } = req.body;
    const data = await User.create({
      username,
      email,
      password,
      phone,
      address,
    });
    res
      .status(201)
      .json({ name: "created", message: "regster successfully", data });
  } catch (error) {
    next(error);
  }
};
