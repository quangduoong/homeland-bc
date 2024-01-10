const fc = require("../../controllers/Forum/Forum.controller");
const upload = require("../../middleware/multer");
const verifyToken = require("../../middleware/verifyToken");
const router = require("express").Router();

router.delete("/delete-post/:id", verifyToken, fc.deletePost);
router.put("/update-post/:id", verifyToken, fc.updatePost);
router.get("/get-posts/:id", fc.getUsersPosts);
router.put("/like-posts", verifyToken, fc.likePosts);
router.put("/create-comment/:id", verifyToken, fc.createComment);
router.get("/get-all-posts", fc.getAllPosts);
router.post(
  "/create-no-image-post",
  verifyToken,
  upload.single("image"),
  fc.createPost
);
router.post("/create-post", verifyToken, upload.single("image"), fc.createPost);

module.exports = router;
