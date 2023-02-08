"use strict";
const { encryptPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/users.json").map((e) => {
      e.password = encryptPassword(e.password);
      (e.createdAt = new Date()), (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
