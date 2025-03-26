const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        // get data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = req.body;


        //validate
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            return res.status(403).send({
                success: false,
                message: "All fields are required"
            })
        }

        //compare password
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again."
            })
        }


        //check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }


        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        //ceate and enter user in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
}


exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }


        // Find user with provided email
        const user = await User.findOne({ email })
            .populate('Posts')
            .populate('savedPosts');

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id, },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            // Save token to user document in database
            user.token = token;
            user.password = undefined; //to protect password from any attack. It willbe removed only from user object and not from database

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    }
    catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}


exports.getProfile = async (req, res) => {
    try {
        // Check if the request contains a valid JWT token
        const userId = req.user.id;

        // Use the decoded data to find the user in the database
        const user = await User.findById(userId)
            .populate('Posts')
            .populate('savedPosts');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Remove sensitive information from the user object
        user.password = undefined;

        return res.status(200).json({
            success: true,
            user,
            message: "User profile retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user profile. Please try again.",
        });
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie('token').json('Logged out');
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error logging out'
        });
    }
}

exports.savePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        // Check if the post is already saved
        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push(postId);
            await user.save();
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving post:', error.message);
        res.status(500).json({ success: false, message: 'Failed to save post' });
    }
};

exports.unsavePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        // Check if the post is saved
        const index = user.savedPosts.indexOf(postId);
        if (index !== -1) {
            user.savedPosts.splice(index, 1);
            await user.save();
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error unsaving post:', error.message);
        res.status(500).json({ success: false, message: 'Failed to unsave post' });
    }
};