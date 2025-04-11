const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        next(); // call the next middleware function in the chain
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized",
        });
    }
};
