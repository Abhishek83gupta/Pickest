const router = require("express").Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { 
     createPost,
     getAllPost, 
     getMyPosts 
   } = require("../controllers/postController");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPost)
router.get("/post/myPosts", verifyToken, getMyPosts)

module.exports = router;
