const mongoose = require("mongoose")

const Tag = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

Tag.index({ name: 'text' });
module.exports = mongoose.model("Tag", Tag)