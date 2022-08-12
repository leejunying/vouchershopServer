const userController = require("../controllers/userController");
const router = require("express-promise-router")();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");

router
  .route("/")
  .get(verifyTokenAndAdmin, userController.getAllUser)
  .post(
    validator.validateBody(validator.schemas.userSchema),
    userController.newUser,
  )
  .delete(verifyTokenAndAdmin, userController.deleteUser)
  .put(verifyTokenAndAdmin, userController.updateUser);

module.exports = router;
