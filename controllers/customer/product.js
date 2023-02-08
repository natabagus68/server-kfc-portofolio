const { Product, User, Category, Favorite } = require("../../models");
const { Op } = require("sequelize");
exports.getAllProduct = async (req, res, next) => {
  try {
    let limit = 8;
    let offset = 0;

    let option = {};

    if (req.query.name) {
      option.where = {
        name: {
          [Op.iLike]: `%${req.query.name}%`,
        },
      };
    } else if (req.query.category) {
      option.where = {
        CategoryId: req.query.category,
      };
    } else if (req.query.offset) {
      offset = req.query.offset * limit;
    }
    const data = await Product.findAndCountAll({
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Category,
          as: "category",
        },
      ],
      limit,
      offset,
      where: option.where,
      order: [["id", "ASC"]],
    });
    console.log(data);
    if (data) {
      res.status(200).json({ data });
    } else {
      throw { name: "No Content", code: 204 };
    }
  } catch (error) {
    next(error);
  }
};

exports.detailProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Product.findByPk(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
