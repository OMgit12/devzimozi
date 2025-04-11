const User = require("../models/userModel"); // import the User model
const bcrypt = require("bcryptjs"); // import the bcrypt module for hashing passwords
const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens
const mongoose = require("mongoose");
const Food = require("../models/foodModel");
const Order = require("../models/orderModel");

const createFood = async (req, res) => {
    try {
        const { title, description, price, categoryId, restaurantId, status, rating } = req.body;

        if (!title || !description || !price || !categoryId || !restaurantId || !status) {
            return res.status(400).json({
                status: false,
                message: "These all fields are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                status: false,
                message: "invalid category id ",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({
                status: false,
                message: "invalid restaurant id ",
            })
        }

        const food = await Food.create({
            title,
            description,
            price,
            categoryId,
            restaurantId,
            status
        });

        return res.status(201).json({
            status: true,
            message: "Food created successfully",
            data: food
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

const getFoodByRestaurantId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "invalid restaurant id ",
            })
        }

        const foodByRestaurant = await Food.find({ restaurantId: id });

        if (!foodByRestaurant) {
            return res.status(400).json({
                status: false,
                message: "No food found with this restaurant id",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Food fetched successfully",
            data: foodByRestaurant
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
}

const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "invalid food id ",
            })
        }

        const updateFood = await Food.findByIdAndUpdate(id, data, { new: true });

        if (!updateFood) {
            return res.status(400).json({
                status: false,
                message: "Food Not Found",
                data: {}
            })
        }

        return res.status(200).json({
            status: true,
            message: "Food updated successfully",
            data: updateFood
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
}

const placeOrderFood = async (req, res) => {
    try {
        const { cart } = req.body;

        if (!cart) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }

        let total = 0;

        cart.map((item) => {
            total += item.price;
        })

        console.log("total>>>>>>>>>", total);

        const newOrders = new Order({
            foods: cart,
            payment: total,
            buyer: req.user.id,
        });

        await newOrders.save();

        return res.status(200).json({
            status: true,
            message: "Order placed successfully",
            data: newOrders
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }

}


const orderStatus = async (req, res) => {
    try {
        const oderId = req.params.id;
        const status = req.body.status;

        if (!oderId) {
            return res.status(400).json({
                status: false,
                message: "Order id is required",
            });
        }

        if (!status) {
            return res.status(400).json({
                status: false,
                message: "Status is required",
            });
        }

        const updateOrder = await Order.findByIdAndUpdate(oderId, { status }, { new: true });

        if (!updateOrder) {
            return res.status(400).json({
                status: false,
                message: "Order Not Found",
                data: {}
            })
        }

        return res.status(200).json({
            status: true,
            message: "Order status updated successfully",
            data: updateOrder
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { createFood, getFoodByRestaurantId, updateFood, placeOrderFood, orderStatus };

