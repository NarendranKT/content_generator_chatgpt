const User = require("../models/User");
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require("../utils/generateToken");
const jwt = require('jsonwebtoken');
const { NODE_ENV, SECRET_KEY } = require("../configs/envConfig");

// $User Registration
const userRegistration = asyncHandler(
    async (req, res) => {
    const { username, email, password } = req.body;     
        
        // $Check if user is exist
        if (!username || !email || !password) {
            res.status(400);
            throw new Error('All the fields are required!');
        }
        const userFound = await User.findOne({ email });
        if (userFound) {
            res.status(400);
            throw new Error("User already exist!");
        }

        // $Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        // $Creating new user
        const user = await User.create({
            username,
            email,
            password: hashedPwd
        })

        // $Adding trail period to the user 
        user.trailExpires = new Date(
            new Date().getTime() + user.trailPeriod * 24 * 60 * 60 * 1000
        );
        
        // $Save the user
        await user.save();

        // $Response
        res.json({
            status: true,
            message: "Registration was successfull",
            user: {
            username,
            email,
            },
        });
    }
)

// $User Login
const userLogin = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        
        // $Check if user exists
        const userFound = await User.findOne({ email });
        if (!userFound) {
            res.status(401);
            throw new Error("Invalid Credentials");
        }

        // $CHeck if password is valid
        const isPasswordMatched = await bcrypt.compare(password, userFound?.password);
        if (!isPasswordMatched) {
            res.status(401);
            throw new Error("Invalid Credentials");
        }

        // $Generate token
        const token = generateToken(userFound._id);

        // $set the token as cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, //!3days
        });

        res.json({
            status: 'success',
            _id: userFound?._id,
            message : "Login success",
            username: userFound?.username,
            email: userFound?.email,
        })

    
    }
)

// $User Logout
const userLogout = asyncHandler(
    async (req, res) => {
        res.cookie("token", "", { maxAge: 1 });
        res.status(200).json({
            status: "success",
            message: 'Logout is successful'
        })
    }
)

// $User Profile
const userProfile = asyncHandler(async (req, res) => {
    
    const userId = req?.user?._id;
    const user = await User.findOne(userId).populate('history').populate('payments').select('-password')
    
    if (user) {
        res.status(200).json({
            status: 'success',
            user,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// $Check user auth status
const checkAuth = asyncHandler(async (req, res) => {
    const decoded = jwt.verify(req.cookies.token, SECRET_KEY)
    if (decoded) {
        res.json({
            isAuthenticated: true,
        })
    } else {
        res.json({
            isAuthenticated: false
        })
    }
})


module.exports = {userRegistration, userLogin, userLogout, userProfile, checkAuth}