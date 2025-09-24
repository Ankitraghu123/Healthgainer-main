const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserProfile,
  getAllUsers,
  todayLogins,
  changePassword,
  updateUserDetails,
<<<<<<< HEAD
=======
  getOTP,
  getOTPLogin,
>>>>>>> completed
} = require("../controllers/authController");
const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();
<<<<<<< HEAD

router.post("/register", registerUser);
router.post("/login", loginUser);
=======
// getOTP
router.post("/register", registerUser);
router.post("/getOTP", getOTP);
router.post("/getotplogin", getOTPLogin);
router.post("/login", loginUser);

>>>>>>> completed
router.post("/logout", isAuthenticated, logoutUser);
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.get("/all", getAllUsers);
router.get("/todayLogins", todayLogins);
router.put("/changePassword", isAuthenticated, changePassword);
router.put("/updateDetails", isAuthenticated, updateUserDetails);

module.exports = router;
