const mongoose = require("mongoose");

const resturentSchema = new mongoose.Schema(
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
      required: [true, "Image is required"],
    },
    foods: { type: Array },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 3,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coods: {
      id: { type: String },
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields to the schema
);

const Resturant = mongoose.model("Resturant", resturentSchema); // create a model named User using the userModel schema
module.exports = Resturant; // export the User model so it can be used in other files
