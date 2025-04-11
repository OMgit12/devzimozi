const User = require("../models/userModel"); // import the User model
const bcrypt = require("bcryptjs"); // import the bcrypt module for hashing passwords
const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const GetUser = await User.findById(
      // findById() method is used to find a document by its ID
      { _id: userId }, // find the user by their ID
      { _id: 0, password: 0 } // hide id and password fields in the response
    );

    if (!GetUser) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: GetUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { email, phone, address, name } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      id, // find the user by their ID
      {
        name,
        email,
        phone,
        address,
      }, // update the user's name, email, phone number, and address values in the database
      { new: true } // return the updated user document in the response
    );

    if (!updateUser) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email || !newpassword || !answer) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email, answer });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found with this email and answer",
      });
    }

    if (user.answer !== answer) {
      return res.status(400).json({
        status: false,
        message: "Wrong Answer",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10); // generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(newpassword, salt); // hash the password using the generated salt

    // update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// update password
const updatePassword = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log("id>>>>>>>>>", id);
    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(id);
    // console.log("user>>>>>>>>>", user);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const isMachedPassword = await bcrypt.compare(oldpassword, user.password); // compare() method is used to compare the password entered by the user with the hashed password stored in the database

    if (!isMachedPassword) {
      return res.status(400).json({
        status: false,
        message: "Old password is incorrect",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10); // generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(newpassword, salt); // hash the password using the generated salt

    // update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id>>>>>>>>>", id);

    const deleteUser = await User.findByIdAndDelete(id);
    // console.log("deleteUser>>>>>>>>>", deleteUser);

    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

module.exports = {
  getUser,
  updateUser,
  resetPassword,
  updatePassword,
  deleteUser,
};
