"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { as: "user", foreignKey: "AuthorId" });
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "CategoryId",
      });

      Product.hasMany(models.Favorite, {
        foreignKey: "ProductId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
      AuthorId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  Product.beforeCreate((prd) => {
    prd.status = "active";
  });
  return Product;
};
