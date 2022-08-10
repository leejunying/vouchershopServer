// @ts-nocheck

const detailpostsController = require("../controllers/detailpostsController");
const router = require("express-promise-router")();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");
const detailposts = require("../models/detailposts");

router
  .route("/")
  .get(detailpostsController.getByVoucherid)
  .post(
    verifyTokenAndAdmin,
    validator.validateBody(validator.schemas.detailpostsSchema),
    detailpostsController.create,
  )
  .put(verifyTokenAndAdmin, detailpostsController.update)
  .delete(verifyTokenAndAdmin, detailpostsController.delete);

module.exports = router;
