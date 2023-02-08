const router = require("express").Router();
const {
  authentication,
  authoritation,
} = require("../../middlewares/authentication");
const {
  getAllCategory,
  destroyCategory,
  postCategory,
} = require("../../controllers/category/category");

router.get("/", authentication, getAllCategory);
router.post("/", authentication, authoritation, postCategory);
router.delete("/:id", authentication, authoritation, destroyCategory);
module.exports = router;
