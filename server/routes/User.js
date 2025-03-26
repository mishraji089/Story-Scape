const express = require("express")
const router = express.Router()

const {
    login,
    signup,
    getProfile,
    logout,
    savePost,
    unsavePost
} = require("../controllers/Auth")

const { auth } = require("../middlewares/auth")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

//Route for getProfile
router.get("/getProfile", auth, getProfile)

// Route for logout
router.post("/logout", logout)

router.post("/savePost/:id", auth, savePost)
router.post("/unsavePost/:id", auth, unsavePost)

module.exports = router