const { Favorite, Product, Customer } = require("../../models");

exports.addFavorite = async (req, res, next) => {
  try {
    const CustomerId = req.customer.id;
    const ProductId = req.params.ProductId;

    await Favorite.create({
      CustomerId,
      ProductId,
    });

    res.status(201).json({ message: "Favorite added" });
  } catch (error) {
    next(error);
  }
};

exports.getAllFavorite = async (req, res, next) => {
  try {
    const CustomerId = req.customer.id;
    const data = await Favorite.findAll({
      where: { CustomerId },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });
    if (data) {
      res.status(200).json({ data });
    } else {
      throw { name: "Not Content", code: 204 };
    }
  } catch (error) {
    next(error);
  }
};

exports.destroyFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Favorite.destroy({ where: { id } });
    res.status(200).json({ message: "delete success" });
  } catch (error) {
    next(error);
  }
};
