const { User } = require("../../models");

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const data = await User.findByPk(+id);

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
