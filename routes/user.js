const userController = require("../controllers/userController");
const router = require("express-promise-router")();
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../Middlewares/verifyToken");
const validator = require("../Middlewares/validation");

router
  .route("/")
  .get(verifyTokenAndAdmin, userController.getAllUser)
  .post(
    validator.validateBody(validator.schemas.userSchema),
    userController.newUser,
  )
  .delete(verifyTokenAndAdmin, userController.deleteUser)
  .put(verifyToken, userController.updateUser);

router.route("/password").put(verifyToken, userController.updatePassword);
router.route("/find").get(verifyToken, userController.getUserbyID);

module.exports = router;
