// Require dotenv hanya ketika process.env.NODE_ENV !== 'production'
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = 9000;
const router = require("./routers");
const { errorHandling } = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/imagesProduct",
  express.static(path.join(__dirname, "imagesProduct"))
);
app.use(router);
app.use(errorHandling);
app.listen(process.env.PORT || PORT, () => {
  console.log("Listening on PORT", PORT);
});
