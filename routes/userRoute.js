const express = require("express");
const router = express.Router(); // create a new router object using express.Router()
const {
  getUser,
  updateUser,
  resetPassword,
  updatePassword,
  deleteUser,
} = require("../controller/userController"); // import the getUser function from the userController file
const authmiddleware = require("../middlewares/authmiddleware");

//routes
// get all users (get)
router.get("/getuser", authmiddleware, getUser); // when a GET request is made to "/getuser", call the getUser function
router.put("/updateuser", authmiddleware, updateUser);
router.post("/resetpassword", authmiddleware, resetPassword);
router.post("/updatepassword", authmiddleware, updatePassword);
router.delete("/deleteuser/:id", authmiddleware, deleteUser);

module.exports = router; // export the router object so it can be used in other files
