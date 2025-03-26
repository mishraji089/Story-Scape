const Post = require("../models/Post")
const Comment = require("../models/Comment")
const User = require("../models/User")

exports.addComment = async (req, res) => {
    try {

        //get Postid , comment statement and author id
        const { postId } = req.params
        const { authorId, comment } = req.body

        const post = await Post.findById(postId)

        //validation
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        //create a new comment
        const newComment = new Comment({
            comment,
            PostId: postId,
            Author: authorId,
        });

        // save the comment to databse
        await newComment.save();

        // add comments objectid to posts comments array
        post.comments.push(newComment._id);
        await post.save();

        //return status
        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
}

exports.getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        // find post in database
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // find all comments on that post
        const comments = await Comment.find({ PostId: postId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'Author',
                select: 'firstName image email',
            })
            .exec();

        res.status(201).json({
            message: 'All Comment fetched successfully',
            comments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
}

exports.deleteComment = async (req, res) => {
    const { commentId, postId } = req.params;

    try {
        // Find the comment and delete it
        await Comment.findByIdAndDelete(commentId);

        // Find the post and remove the comment ID from its comments array
        const post = await Post.findById(postId);
        post.comments = post.comments.filter(comment => comment.toString() !== commentId);
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
};