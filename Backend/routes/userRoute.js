const express = require("express");
const router = express.Router();

const {
  loginUser,
  logout,
  getAllUser,
  getUserDetails,
  registerUser,
  // forgotPassword,
  // resetPassword,
  // updatePassword,
  // updateProfile,
  // getSingleUser,
  // // updateUserRole,
  // deleteUser,
  // updateSingleUserById,
} = require("../controllers/userController");
// const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/users/register-user").post(registerUser);

router.route("/auth/login").post(loginUser);

router.route("/auth/logout").get(logout);

router.route("/profile").get(getUserDetails);
router.route("/users/all-users").get(getAllUser);

module.exports = router;

// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

// router
//   .route("/admin/update/user/:id")
//   .put(isAuthenticatedUser, updateSingleUserById);

// router.route("/admin/user/:id").get(isAuthenticatedUser, getSingleUser);

// // router.route("/admin/user/:id").put(isAuthenticatedUser, updateUserRole);

// router.route("/admin/user/:id").delete(isAuthenticatedUser, deleteUser);
