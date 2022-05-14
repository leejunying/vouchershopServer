// @ts-nocheck
const voucherController = require("../controllers/voucherContrller");
const router = require("express-promise-router")();
const validator = require("../Middlewares/validation");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../Middlewares/verifyToken");

router
  .route("/")
  .post(voucherController.newVoucher)
  // .get(voucherController.getAllVoucher);
  .get(voucherController.getVoucherByPage);
router.route("/top").get(voucherController.getTopVoucher);

router
  .route("/:id")
  .get(voucherController.getVoucherByID)
  .put(voucherController.updateVoucher)
  .delete(verifyTokenAndAdmin, voucherController.deleteVoucher);
module.exports = router;
