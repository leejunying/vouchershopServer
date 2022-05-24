// @ts-nocheck

const categorysController = require("../controllers/categorysController");
const router = require("express-promise-router")();
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");

router.route("/").get(categorysController.getCategory).post(
  // verifyTokenAndAdmin,
  validator.validateBody(validator.schemas.categorysSchema),
  categorysController.newCategory,
);

module.exports = router;
