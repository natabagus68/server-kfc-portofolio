const router = require("express").Router();
const { authentication } = require("../../middlewares/authentication");
const { getUser } = require("../../controllers/user/user");
router.get("/", authentication, getUser);
module.exports = router;
