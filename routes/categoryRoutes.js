const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require("../controller/categoryController");

const router = express.Router(); // create a new router object using express.Router()

//routes
router.post("/create", authmiddleware, createCategory);
router.get("/get", authmiddleware, getAllCategory);
router.get("/get/:id", authmiddleware, getCategoryById);
router.put("/update/:id", authmiddleware, updateCategory);
router.delete("/delete/:id", authmiddleware, deleteCategory);

module.exports = router; // export the router object so it can be used in other files
