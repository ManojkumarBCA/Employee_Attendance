const ErrorHandler = require("../utils/errorhandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const userModel = require("../models/userModel");

exports.isAuthenticatedUser = (async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

// //=============================================================================================================
// //admin access
// exports.isAdmin = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.user._id);
//         if (user.role !== 1) {
//             return res.status(401).send({
//                 success: false,
//                 message: "UnAuthorized Access",
//             });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             success: false,
//             error,
//             message: "Error in admin middleware",
//         });
//     }
// };



// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(
//                 new ErrorHandler(
//                     `Role: ${req.user.role} is not allowed to access this resource`,
//                     403
//                 )
//             );
//         }
//         next();
//     };
// };
// //=============================================================================================================



