const router = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const { getAllHistories } = require("../controllers/history/history");
router.get("/", authentication, getAllHistories);
module.exports = router;
