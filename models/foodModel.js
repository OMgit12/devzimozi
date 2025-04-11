const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        imageUrl: {
            type: String,
            default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resturent",
        },
        rating: {
            type: Number,
            default: 3,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true } // automatically adds createdAt and updatedAt fields to the schema
);

const Food = mongoose.model("Food", foodSchema); // create a model named food using the foodSchema schema
module.exports = Food; // export the food  model so it can be used in other files
