const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        foods: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
        }],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        status: {
            type: String,
            enum: ["pending", "completed", "cancelled", "preparing"],
            default: "pending",
        },


    },
    { timestamps: true } // automatically adds createdAt and updatedAt fields to the schema
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order; 