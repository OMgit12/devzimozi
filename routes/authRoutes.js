const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");

const router = express.Router(); // create a new router object using express.Router()

//routes
// ragister route (post)
router.post("/register", registerUser);

//login route (post)
router.post("/login", loginUser);

module.exports = router; // export the router object so it can be used in other files
