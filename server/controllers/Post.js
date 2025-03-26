const Post = require("../models/Post")
const User = require("../models/User")
const Tag = require("../models/Tag")
const mongoose = require('mongoose');

const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.createPost = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        //Get all data from req.body
        let {
            title,
            summary,
            content,
            tag,
        } = req.body

        //get thumbnail from req.file
        // const thumbnail = req.files.thumbnail
        // console.log("thumbnail is" +thumbnail)

        const thumbnail = req.files && req.files.thumbnail;

        //validation. Sare field hone chahiye
        if (!title || !summary || !content || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            })
        }

        // check if tag is valid
        const TagDetails = await Tag.findById(tag)
        if (!TagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag Details Not Found",
            })
        }

        // upload the image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );


        //create new post
        const newPost = await Post.create({
            title,
            summary,
            content,
            Tag: TagDetails.id,
            Author: userId,
            thumbnail: thumbnailImage.secure_url,
        })

        // Add Post to User Section
        try {
            await User.findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    $push: {
                        Posts: newPost._id,
                    },
                },
                { new: true }
            )
        }
        catch (errror) {
            return res.status(404).json({
                success: false,
                message: "Couldnot updated on user",
            })
        }

        // Add Post to Tag Section
        try {
            await Tag.findByIdAndUpdate(
                {
                    _id: tag
                },
                {
                    $push: {
                        Posts: newPost._id,
                    },
                },
                { new: true }

            )
        }
        catch (error) {
            return res.status(404).json({
                success: false,
                message: "could not updated on tag",
            })
        }

        // Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newPost,
            message: "Post Created Successfully",
        });
    }
    catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create Post",
            error: error.message,
        });
    }
}

exports.getAllPosts = async (req, res) => {
    try {

        const allPosts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate({
                path: 'Author',
                model: 'User', // Assuming your User model is named 'User'
                select: 'firstName lastName image', // Select the fields you want to populate
            })
            .populate({
                path: 'Tag',
                model: 'Tag', // Assuming your Tag model is named 'Tag'
                select: 'name description', // Select the fields you want to populate
            });

        res.status(200).json({
            success: true,
            data: allPosts,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getRandomPosts = async (req, res) => {
    try {
        // Find random posts in the database
        const posts = await Post.find().limit(5).populate({
            path: 'Author',
            model: 'User', // Assuming your User model is named 'User'
            select: 'firstName lastName image', // Select the fields you want to populate
        });

        res.status(200).json({
            success: true,
            message: 'Random posts fetched successfully',
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch random posts' });
    }
};


exports.getPost = async (req, res) => {
    try {

        const postId = req.params.id; // Assuming you have the post ID in the request parameters
        const specificPost = await Post.findById(postId)
            .populate({
                path: 'Author',
                model: 'User', // Assuming your User model is named 'User'
                select: 'firstName lastName image email', // Select the fields you want to populate
            })
            .populate({
                path: 'Tag',
                model: 'Tag', // Assuming your Tag model is named 'Tag'
                select: 'name description', // Select the fields you want to populate
            });

        if (!specificPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            data: specificPost,
        });
    } catch (error) {
        console.error('Error fetching specific post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch specific post',
            error: error.message,
        });
    }
};




exports.updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: 'Post not found' });
        }

        // Update post fields
        post.title = request.body.title;
        post.summary = request.body.summary;
        post.content = request.body.content;
        post.thumbnail = request.body.thumbnail;

        // Update tag if provided
        if (request.body.tag) {
            post.Tag = request.body.tag;
        }

        await post.save();

        return response.status(200).json({
            success: true,
            data: post,
            message: "Post updated successfully",
        });

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: "Failed to update Post",
            error: error.message,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Delete post
        await Post.findByIdAndDelete(postId);

        // Delete post from User model
        await User.updateMany({}, { $pull: { Posts: postId, savedPosts: postId } });

        // Delete post from Tag model
        await Tag.updateMany({}, { $pull: { Posts: postId } });

        // Delete comments associated with the post
        // await Comment.deleteMany({ PostId: postId });

        res.status(200).json({ success: true, message: "Post and its references deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete post", error: error.message });
    }
};

