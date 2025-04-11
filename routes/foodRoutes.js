const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createFood, getFoodByRestaurantId, updateFood, placeOrderFood, orderStatus } = require("../controller/foodController");

const router = express.Router(); // create a new router object using express.Router()

//routes
// create food (post)
router.post("/create", authmiddleware, createFood);

// get food by restaurant id (get)
router.get("/get/:id", authmiddleware, getFoodByRestaurantId);

//update food (put)
router.put("/update/:id", authmiddleware, updateFood);

// place order (post)
router.post("/placeorder", authmiddleware, placeOrderFood);

// status update of order (post)
router.post("/status/:id", authmiddleware, orderStatus);

module.exports = router; // export the router object so it can be used in other files
