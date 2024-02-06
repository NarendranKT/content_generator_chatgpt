const asyncHandler = require("express-async-handler");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/User");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (token) {
        const decodedId = verifyToken(token)?.id;
        req.user = await User.findById(decodedId).select('-password');
        return next();
    } else {
        return res.status(401).json({
            message: 'Not authorized, no token'
        })
    }
    
})

module.exports = isAuthenticated;