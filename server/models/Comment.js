const mongoose = require("mongoose")

const Comment = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            trim: true
        },
        PostId: {
            type: String,
            required: true,
            trim: true
        },
        Author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        PostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("Comment", Comment)