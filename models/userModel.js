const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    address: {
      type: Array,
    },
    userType: {
      type: String,
      enum: ["admin", "client", "user"],
      default: "client",
      required: [true, "User type is required"],
    },
    profileimage: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields to the schema
);

const User = mongoose.model("User", userSchema); // create a model named User using the userModel schema
module.exports = User; // export the User model so it can be used in other files
