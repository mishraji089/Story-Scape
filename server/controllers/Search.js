const Post = require("../models/Post");
const Tag = require("../models/Tag");
const User = require("../models/User");

exports.searchUser = async (req, res) => {
    try {
        console.log("Search user started")
        const { query } = req.body;
        const users = await User.find({ $text: { $search: query } });
        res.json(users);
        console.log("Search user ended")
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'An error occurred while searching users',error });
    }
};

exports.searchPost = async (req, res) => {
    try {
        console.log("Searching post started")
        const { query } = req.body;
        const posts = await Post.find({ $text: { $search: query } });
        res.json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'An error occurred while searching posts' });
    }
};

exports.searchTag = async (req, res) => {
    try {
        console.log("Search tag started")
        const { query } = req.body;
        const tags = await Tag.find({ $text: { $search: query } });
        res.json(tags);
    } catch (error) {
        console.error('Error searching tags:', error);
        res.status(500).json({ error: 'An error occurred while searching tags' });
    }
};
