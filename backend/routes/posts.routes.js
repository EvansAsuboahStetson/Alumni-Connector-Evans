const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const postsController = require("../controllers/posts.controller");

// Retrieve all posts
router.get("/posts", middleware.verify, postsController.findAllPost);
router.post("/posts/createPost", middleware.verify, postsController.createPost);
router.post("/posts/createReply",middleware.verify,postsController.PostReply);

router.patch(
  "/posts/updateComment",
  middleware.verify,
  postsController.findCommentUpdateController
);

module.exports = router;

