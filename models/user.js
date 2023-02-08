"use strict";
const { encryptPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "AuthorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "username required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email already taken" },
        validate: {
          notEmpty: { msg: "email required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password required" },
        },
      },
      role: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "phone required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "address required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.role = "admin";
    user.password = encryptPassword(user.password);
  });
  return User;
};
