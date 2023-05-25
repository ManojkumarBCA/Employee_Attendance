const ErrorHandler = require("../utils/errorhandler");
const Admin = require("../models/loginModel");
// const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwrToken");

//Login User========================================
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user as given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email and Password", 400));
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
  const isPasswordMatched = await admin.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
  sendToken(admin, 200, res);
};

//Admin Logout ========================================

exports.logoutAdmin = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
``;


























// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const Login = require("../models/loginModel");
// const crypto = require("crypto");
// const bcrypt = require('bcrypt');

// //Login Admin
// exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
//     // return res.send({ message: 'Password reset successfully' });
//     const { email, password } = req.body;
//     const login = await Login.findOne({ email: req.body.email });
//     if (!login) {
//         return res.status(401).send({ message: 'Invalid email or password' });
//     }
//     const isPasswordValid = await bcrypt.compare(password, Login.password);

//     if (!isPasswordValid) {
//         return res.status(401).send({ message: 'Invalid email or password' });
//     }
// });
