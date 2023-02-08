exports.errorHandling = (error, req, res, next) => {
  code = 500;
  name = "Internal Server Error";
  message = "";

  if (error.name === "SequelizeValidationError") {
    code = 400;
    name = "Bad Request";
    message = error.errors.map((e) => {
      return e.message;
    });
  } else if (error.name === "JsonWebTokenError") {
    code = 401;
    name = "Unauthorized";
    message = "invalid json web token";
  } else {
    code = error.code;
    name = error.name;
    message = error.message;
  }

  console.log(code, name, message);
  res.status(code).json({ name, message });
};
