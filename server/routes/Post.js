const express = require("express")
const router = express.Router()

const {
    createTag, getAllTags, getTag
} = require("../controllers/Tag")

const {
    createPost, getAllPosts, getPost, updatePost, getRandomPosts, deletePost
} = require("../controllers/Post")

const {
    addComment, getComments, deleteComment
} = require("../controllers/Comments")

const { auth } = require("../middlewares/auth")


// ag
router.post("/createTag", createTag)
router.get("/getAllTags", getAllTags)
router.get("/getTag/:id", getTag)


// Create Post
router.post("/createPost", auth, createPost)
router.get("/getAllPosts", getAllPosts)
router.get("/getRandomPosts", getRandomPosts)
router.get("/getPost/:id", getPost);
router.put("/updatePost/:id", updatePost)
router.delete("/delete/:id",auth, deletePost)

//Comments
router.post("/:postId/addComment", addComment)
router.get("/:postId/getComments", getComments)
router.delete('/:postId/comment/:commentId', deleteComment);


module.exports = router