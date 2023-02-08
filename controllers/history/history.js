const { Histories } = require("../../models");

exports.getAllHistories = async (req, res, next) => {
  try {
    const { email } = req.user;
    const data = await Histories.findAll({ where: { email } });
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(204).json({ name: "No Content" });
    }
  } catch (error) {
    next(error);
  }
};
