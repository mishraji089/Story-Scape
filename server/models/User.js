const mongoose = require("mongoose")


const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        },
        token: {
            type: String,
        },
        Posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        savedPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    }
)

User.index({ firstName: 'text'});

module.exports = mongoose.model("User", User)