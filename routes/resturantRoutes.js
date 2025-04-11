const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createResturant, getAllResturant, getResturantById, deleteResturant } = require("../controller/resturantController");

const router = express.Router(); // create a new router object using express.Router()

//routes
// create restorant (post)
router.post("/create", authmiddleware, createResturant);

// get all restorant (get)
router.get("/getAll", authmiddleware, getAllResturant);

// get restorant by id (get)
router.get("/get/:id", authmiddleware, getResturantById);

// delete restorant (delete)
router.delete("/delete/:id", authmiddleware, deleteResturant);

module.exports = router; // export the router object so it can be used in other files
