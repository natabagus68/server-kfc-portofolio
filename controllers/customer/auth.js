const { Customer } = require("../../models");
const { comparePassword } = require("../../helpers/bcrypt");
const { generateToken } = require("../../helpers/jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    console.log(customer);
    if (customer) {
      const validate = comparePassword(password, customer.password);
      if (validate) {
        const payload = {
          id: customer.id,
          email,
        };

        const access_token = generateToken(payload);
        res.status(200).json({ access_token });
      } else {
        throw { message: "invalid password" };
      }
    } else {
      throw { message: "invalid email" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, phone, address } = req.body;
    await Customer.create({
      username,
      email,
      password,
      phone,
      address,
    });

    console.log("success");
    res.status(201).json({ message: "register success" });
  } catch (error) {
    next(error);
  }
};
