// @ts-nocheck
const paymentController = require("../controllers/paymentController");
const router = require("express-promise-router")();
const {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
} = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");

router
  .route("/")
  .get(verifyTokenAndAdmin, paymentController.getAlll)
  .post(
    verifyToken,
    validator.validateBody(validator.schemas.paymentSchema),
    paymentController.createOne,
  )
  .put(verifyTokenAndAdmin, paymentController.update)
  .delete(verifyTokenAndAdmin, paymentController.delete);

router.route("/count").get(paymentController.countPayMent);
module.exports = router;
