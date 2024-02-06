const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
    
    const userId = req?.user?._id;
    if (!userId) {
        return res.status(400).json('Not Authorized');
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json('No user found');
    }

    let requestLimit = user?.monthlyRequestCount;
    if (user?.trailActive) {
        requestLimit = user?.monthlyRequestCount;
    }

    if (user?.apiRequestCount >= requestLimit) {
        throw new Error("Api Request Limit Reached!, Please Subscribe to a Plan")
    }

    next();
})

module.exports = checkApiRequestLimit;