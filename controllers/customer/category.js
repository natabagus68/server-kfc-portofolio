const { Category } = require("../../models");

exports.getAllCategory = async (req, res, next) => {
  try {
    const data = await Category.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
