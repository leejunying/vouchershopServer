// @ts-nocheck
const voucherController = require("../controllers/voucherContrller");
const router = require("express-promise-router")();
const validator = require("../Middlewares/validation");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyToken,
} = require("../Middlewares/verifyToken");

router
  .route("/")
  .post(verifyToken, voucherController.newVoucher)
  .get(voucherController.getAllVoucher);
// .get(
//   validator.validateGetVoucherQuery(validator.schemas.voucherGetQurerySchema),
//   voucherController.getVoucherByPage,
// );
router.route("/top").get(voucherController.getTopVoucher);
router.route("/find/:slug").get(voucherController.getVoucherBySlug);

router
  .route("/:id")
  .get(voucherController.getVoucherByID)
  .put(voucherController.updateVoucher)
  .delete(verifyTokenAndAdmin, voucherController.deleteVoucher);

module.exports = router;
