const express = require("express")
const router = express.Router()

const {
    searchUser, searchTag, searchPost
} = require("../controllers/Search")

router.post('/search-post', searchPost);
router.post('/search-tag', searchTag);
router.post('/search-user', searchUser);

module.exports = router