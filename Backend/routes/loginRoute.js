const express = require("express");
const router = express.Router();


const {
  loginAdmin,
  logoutAdmin,
} = require("../controllers/loginController");
// const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/login").post(loginAdmin);

router.route("/admin/logout").get(logoutAdmin);

// router.route("/admin/reset").put(isAuthenticatedUser, updateAdminPassword);

module.exports = router;

