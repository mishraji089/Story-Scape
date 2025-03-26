const Tag = require("../models/Tag")
const Post = require("../models/Post")
exports.createTag = async (req, res) => {
    try {

        // get name and description from req.body
        const { name, description } = req.body

        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "all fields are compulsory"
            })
        }

        const checktag = await Tag.findOne({ name })
        if (checktag) {
            return res.status(402).json({
                success: false,
                message: "Tag already exists.",
            });
        }
        //create entry in db
        const TagDetails = await Tag.create({
            name: name,
            description: description
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Tag  creation FAiled",
        });
    }
}

exports.getAllTags = async (req, res) => {
    try {

        const allTags = await Tag.find({})

        res.status(200).json({
            success: true,
            data: allTags,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getTag = async (req, res) => {
    try {

        const tagId = req.params.id;

        const specificTag = await Tag.findById(tagId)
            .populate({
                path: 'Posts',
                model: 'Post', // Assuming your User model is named 'User'
            })

        if (!specificTag) {
            return res.status(404).json({
                success: false,
                message: 'Tag not found',
            });
        }

        res.status(200).json({
            success: true,
            data: specificTag,
        });

    } catch (error) {
        console.error('Error fetching specific tag:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch specific tag',
            error: error.message,
        });
    }
}