// @ts-nocheck
const paymentController = require("../controllers/paymentController");
const router = require("express-promise-router")();
const {
  verifyToken,
  verifyTokenAndUserAuthorization,
} = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");

router
  .route("/")
  .get(paymentController.getAlll)
  .post(
    verifyToken,
    validator.validateBody(validator.schemas.paymentSchema),
    paymentController.createOne,
  );

module.exports = router;
