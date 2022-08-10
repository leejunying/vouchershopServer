// @ts-nocheck
const postController = require("../controllers/postController");
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const router = require("express-promise-router")();

router
  .route("/")
  .get(postController.getAllPost)
  .post(verifyTokenAndAdmin, postController.createPost)
  .put(verifyTokenAndAdmin, postController.updatePost)
  .delete(verifyTokenAndAdmin, postController.deletePost);

router.route("/find").get(postController.getPostbyID);

module.exports = router;
