const router = require("express").Router();
const multer = require("multer");

const {
  getAllProduct,
  getProduct,
  postProduct,
  destroyProduct,
  updateProduct,
  updateStatus,
} = require("../../controllers/product/product");
const {
  authentication,
  authoritation,
} = require("../../middlewares/authentication");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imagesProduct");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.get("/", authentication, getAllProduct);
router.post(
  "/",
  authentication,
  authoritation,
  multer({ storage, fileFilter }).single("image"),
  postProduct
);
router.get("/:id", authentication, getProduct);
router.delete("/:id", authentication, authoritation, destroyProduct);
router.put(
  "/:id",
  authentication,
  authoritation,
  multer({ storage, fileFilter }).single("image"),
  updateProduct
);
router.patch("/:id", authentication, authoritation, updateStatus);
module.exports = router;
