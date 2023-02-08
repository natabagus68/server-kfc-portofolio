const { Category } = require("../../models");

exports.getAllCategory = async (req, res, next) => {
  try {
    const data = await Category.findAll();
    if (data) {
      res.status(200).json({ data });
    } else {
      throw { name: "No Content", code: 204, message: "data null" };
    }
  } catch (error) {
    next(error);
  }
};

exports.destroyCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ctg = await Category.findByPk(id);
    if (ctg) {
      await Category.destroy({ where: { id } });
      res.status(204).json({ name: "delete successfuly" });
    } else {
      throw { name: "No Content", code: 204, message: "data null" };
    }
  } catch (error) {
    next(error);
  }
};

exports.postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name) {
      const data = await Category.create({ name });
      res.status(201).json({ message: "created category", data });
    } else {
      throw { code: 400, name: "Bad Request" };
    }
  } catch (error) {
    next(error);
  }
};
