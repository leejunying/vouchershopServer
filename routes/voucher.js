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
  .post(verifyTokenAndAdmin, voucherController.newVoucher)
  .get(voucherController.getAllVoucher)
  .put(verifyTokenAndAdmin, voucherController.updateVoucher)
  .delete(verifyTokenAndAdmin, voucherController.deleteVoucher);

router.route("/top").get(voucherController.getTopVoucher);
router.route("/find/:slug").get(voucherController.getVoucherBySlug);
router.route("/filter").get(voucherController.getVoucherByPage);

module.exports = router;
