const router = require("express").Router();
const { login, register } = require("../../controllers/customer/auth");
const { authenticationCus } = require("../../middlewares/authenticationCust");
const {
  addFavorite,
  getAllFavorite,
  destroyFavorite,
} = require("../../controllers/customer/favorite");
const {
  getAllProduct,
  detailProduct,
} = require("../../controllers/customer/product");
const { getAllCategory } = require("../../controllers/customer/category");
router.post("/login", login);
router.post("/register", register);
router.get("/products", getAllProduct);
router.get("/categories", getAllCategory);
router.get("/favorite", authenticationCus, getAllFavorite);
router.post("/favorite/:ProductId", authenticationCus, addFavorite);
router.get("/products/:id", detailProduct);
router.delete("/favorite/:id", authenticationCus, destroyFavorite);

module.exports = router;
