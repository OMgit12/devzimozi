const User = require("../models/userModel"); // import the User model
const bcrypt = require("bcryptjs"); // import the bcrypt module for hashing passwords
const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens
const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

const createCategory = async (req, res) => {
    try {
        const { title, description, imageUrl, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({
                status: false,
                message: "These fields are required",
            });
        }

        const category = await Category.create({
            title,
            description,
            imageUrl,
            status
        });

        return res.status(201).json({
            status: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const getAllCategory = await Category.find({})


        if (!getAllCategory) {
            return res.status(400).json({
                status: false,
                message: "Category Not Found",
                data: []
            })
        }

        return res.status(200).json({
            status: true,
            message: "Get All Category",
            data: getAllCategory,
            total: getAllCategory.length
        })
    } catch (error) {
        console.log(error)
        return res.status.json({
            status: false,
            message: "internal server error",
            error: error.message
        })
    }
}


const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: false,
                message: "provide category id",
                data: []
            })
        }

        const getCategoryById = await Category.findById(id)

        if (!getCategoryById) {
            return res.status(400).json({
                status: false,
                message: "Category Not Found",
                data: {}
            })
        }

        return res.status(200).json({
            status: true,
            message: "Get Category By Id",
            data: getCategoryById
        })
    }
    catch (error) {
        console.log(error)
        return res.status.json({
            status: false,
            message: "internal server error",
            error: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "invalid category id",
                data: []
            })
        }

        if (!req.body) {
            return res.status(400).json({
                status: false,
                message: "provide category details",
                data: []
            })
        }

        const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true })

        if (!updateCategory) {
            return res.status(400).json({
                status: false,
                message: "Category Not Found",
                data: {}
            })
        }

        return res.status(200).json({
            status: true,
            message: "Category Updated Successfully",
            data: updateCategory
        })
    }
    catch (error) {
        console.log(error)
        return res.status.json({
            status: false,
            message: "internal server error",
            error: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "invalidss  category id",
                data: []
            })
        }

        const deleteCategory = await Category.findByIdAndDelete(id)

        if (!deleteCategory) {
            return res.status(400).json({
                status: false,
                message: "Category Not Found",
                data: {}
            })
        }

        return res.status(200).json({
            status: true,
            message: "Category Deleted Successfully",
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message
        })
    }
}

module.exports = { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory }