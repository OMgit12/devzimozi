const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    imageUrl: {
      type: String,
      default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
    status: {
      type: Boolean,
      default: true,
      required: [true, "Status is required"],
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields to the schema
);

const Category = mongoose.model("Category", categorySchema); // create a model named User using the userModel schema
module.exports = Category; // export the User model so it can be used in other files
