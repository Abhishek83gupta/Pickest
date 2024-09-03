const router = require("express").Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { 
     createPost,
     getAllPost, 
     getMyPosts,
     deletePost,
     searchPost,
     addToFavourites,
     removeFromFavourites,
     getFavourites,
     getPostsByDateRange
   } = require("../controllers/postController");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPost)
router.get("/post/myPosts", verifyToken, getMyPosts)
router.delete("/post/delete/:id", verifyToken, deletePost)
router.get("/posts/search", searchPost)
router.put("/post/addToFavourites/:postId",verifyToken,addToFavourites )
router.put("/post/addToFavourites/:postId",verifyToken,removeFromFavourites )
router.get("/posts/favourites",verifyToken, getFavourites)
router.get("/post/getPostsByDateRange", verifyToken, getPostsByDateRange)

module.exports = router;
