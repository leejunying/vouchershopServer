// @ts-nocheck

let A =[1,2,3]

Array(3).map()

a.map()

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
  .get(
    validator.validateCategoryQuery(validator.schemas.categoryQuerySchema),
    categorysController.getCategory,
  )
  .post(
    // verifyTokenAndAdmin,
    validator.validateBody(validator.schemas.categorysSchema),
    categorysController.newCategory,
  );

router.route("/all").get(categorysController.getAll);
router.route("/:key").get(categorysController.getCategoryID);

module.exports = router;
