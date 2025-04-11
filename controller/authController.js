const User = require("../models/userModel"); // import the User model
const bcrypt = require("bcryptjs"); // import the bcrypt module for hashing passwords
const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens
require("dotenv").config(); // usually at the top of your main file

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, userType, answer } =
      req.body; // destructuring the request body to get the user details
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !userType ||
      !answer
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // check if user already exists
    const user = await User.findOne({ email: email }); // findOne() method is used to find a single document in the collection that matches the query
    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this email",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10); // generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password using the generated salt

    // create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      userType,
      answer,
    }); // create() method is used to create a new document in the collection

    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // destructuring the request body to get the user email and password values

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password Both are required",
      });
    }

    // check if user exists
    const userExist = await User.findOne({ email: email }); // findOne() method is used to find a single document in the collection that matches the query
    if (!userExist) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    // console.log("userExist", userExist); // log the userExist object to the console

    const isMachedPassword = await bcrypt.compare(password, userExist.password); // compare() method is used to compare the password entered by the user with the hashed password stored in the database

    if (!isMachedPassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // sign() method is used to create a new JWT token with the user ID and secret key
    // in which process.env.JWT_SECRET is the secret key used to sign the token and expiresIn is the time duration for which the token is valid

    // userExist.password = undefined; // remove the password field from the user object before sending it in the response

    // user login successful
    res.status(200).json({
      status: true,
      message: "User login successful",
      token: token,
      data: userExist,
    });
  } catch (error) {
    console.log("error", error); // log the error object to the console
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser }; // export the registerUser and loginUser functions so they can be used in other files
