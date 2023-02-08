const router = require("express").Router();
const { login, googleLogin } = require("../../controllers/loginUser/login");

router.post("/", login);
router.post("/google", googleLogin);

module.exports = router;
