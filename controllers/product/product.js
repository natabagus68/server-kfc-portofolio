const { Product, User, Category, History } = require("../../models");
const { Op } = require("sequelize");
exports.getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.findAll({
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
    });
    if (data) {
      res.status(200).json({ data });
    } else {
      throw { name: "No Content", code: 204 };
    }
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Product.findByPk(id, {
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
    });

    if (data) {
      res.status(200).json({ data });
    } else {
      throw { name: "No Content", code: 204 };
    }
  } catch (error) {
    next(error);
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    console.log(req.file);
    const { email } = req.user;
    const AuthorId = req.user.id;
    const { name, description, price, stock, CategoryId } = req.body;
    if (!req.file) {
      throw { name: "Bad Request", code: 400, message: "file required" };
    }
    const data = await Product.create({
      name,
      description,
      price,
      stock,
      imgUrl: req.protocol + "://" + req.get("host") + "/" + req.file.path,
      CategoryId,
      AuthorId,
    });

    await History.create({
      title: "create new Product",
      description: "create new product " + name,
      updatedBy: email,
    });
    res.status(201).json({ message: "product created", data });
  } catch (error) {
    next(error);
  }
};

exports.destroyProduct = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    await History.create({
      title: "delete Product",
      description: "delete product with id " + id,
      updatedBy: email,
    });
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { id } = req.params;

    if (req.file) {
      req.body.imgUrl =
        req.protocol + "://" + req.get("host") + "/" + req.file.path;
    }

    const { name, description, price, stock, imgUrl, CategoryId } = req.body;

    const data = await Product.update(
      {
        name,
        description,
        price,
        stock,
        imgUrl,
        CategoryId,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "product updated" });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { email } = req.user;

    const { id } = req.params;
    const { status } = req.body;
    const prd = await Product.findByPk(id);
    if (prd) {
      7;
      await Product.update({ status }, { where: { id } });

      res.status(201).json({ message: "status updated" });
    } else {
      throw { name: "Not Found" };
    }
  } catch (error) {
    next(error);
  }
};
