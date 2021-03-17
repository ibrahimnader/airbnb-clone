const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exist
    if (!token) {
        return next(new ErrorResponse('Not Authorized', 401));
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        next(err);
    }
});


exports.authorizeAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(new ErrorResponse(`premission denied`, 403))
    }
    next();
}



