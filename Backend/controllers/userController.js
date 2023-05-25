const ErrorHandler = require("../utils/errorhandler");
const Employee_user = require("../models/userModel");
const sendToken = require("../utils/jwrToken");
const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

//Register a User
exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      surname,
      username,
      email,
      locationName,
      department,
      designation,
      password,
    } = req.body;
    let isAlreadyUsed = await Employee_user.findOne({ email });
    if (isAlreadyUsed) {
      return res.status(400).send({
        status: false,
        message: ` ${email} mail is already registered`,
        Employee_user,
      });
    }
    const user = await Employee_user.create({
      firstName,
      surname,
      username,
      email,
      locationId: { locationName },
      department,
      designation,
      password,
    });
    const token = user.getJWTToken();
    res.status(201).json({
      success: true,
      token: token,
      Employee_user,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //checking if user as given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email and Password", 400));
    }
    const user = await Employee_user.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or Password", 401));
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//User Logout
exports.logout = async (req, res, next) => {
  try {
    console.log("logout");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      // httpOnly:true
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    //creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await Employee_user.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is Invalid has been expired",
          404
        )
      );
    }
    if (req.body.password != req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//get Customer details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await Employee_user.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Update Customer Password Using Old Password
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await Employee_user.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("old Password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler(" Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Update Customer Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await Employee_user.findByIdAndUpdate(
      req.user.id,
      {
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        avatar: req.file.filename,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get All Customer
exports.getAllUser = async (req, res, next) => {
  try {
    const users = await Employee_user.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get Single User
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await Employee_user.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


