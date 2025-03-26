const mongoose = require("mongoose")

const Post = new mongoose.Schema(
    {
        title:{
            type: String,
			required: true,
			trim: true,
        },
        summary:{
            type: String,
			required: true,
			trim: true,
        },
        content:{
            type: String,
			required: true,
			trim: true,
        },
        Author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        Tag:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
        },
        thumbnail:{
            type: String,
			required: true,
			trim: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comments',
            },
        ],
    }, {timestamps:true}
)

Post.index({ title: 'text', summary: 'text', content: 'text' });

module.exports = mongoose.model("Post", Post)