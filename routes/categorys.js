// @ts-nocheck

const categorysController = require("../controllers/categorysController");
const router = require("express-promise-router")();
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");
const categorys = require("../models/categorys");

router
  .route("/")
  .get(categorysController.getAll)
  .post(
    verifyTokenAndAdmin,
    validator.validateBody(validator.schemas.categorysSchema),
    categorysController.newCategory,
  );

module.exports = router;
