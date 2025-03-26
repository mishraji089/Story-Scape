const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        // console.log("Middleware started")
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");


        
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        // console.log("middle token is",token)
        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decode is ",decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid', token,
            });
        }
        // console.log("Middelware completed")
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}