const { User } = require("../../models");
const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../../helpers/bcrypt");
const { generateToken } = require("../../helpers/jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!email || !password) {
      throw {
        name: "Bad Request",
        code: 400,
        message: "email/password required",
      };
    }
    if (user) {
      const comparePWD = comparePassword(password, user.password);
      if (comparePWD) {
        // create token
        const payload = {
          id: user.id,
          email,
          role: user.role,
        };

        const access_token = generateToken(payload);
        res.status(200).json({ message: "login success", access_token });
      } else {
        throw {
          message: "invalid email/password",
          code: 400,
          name: "Bad request",
        };
      }
    } else {
      throw {
        message: "invalid email/password",
        code: 400,
        name: "Bad Request",
      };
    }
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    let token = req.headers.google_token;
    const CLIENT_ID = process.env.CLIENT_ID;

    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const googlePayload = ticket.getPayload();
    const [user, created] = await User.findOrCreate({
      where: { email: googlePayload.email },
      defaults: {
        email: googlePayload.email,
        password: "password",
        role: "staff",
      },
      hooks: false,
    });

    let payload = {
      id: user.id,
    };

    let access_token = createToken(payload);
    res.status(200).json({ access_token, email: user.email, role: user.role });
    verify().catch(console.error);
  } catch (error) {
    next(error);
  }
};
