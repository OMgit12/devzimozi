const User = require("../models/userModel"); // import the User model
const bcrypt = require("bcryptjs"); // import the bcrypt module for hashing passwords
const { json } = require("express");
const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens
const Resturant = require("../models/resturentModel");

// create resturant api
const createResturant = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      address,
      rating,
      logoUrl,
      ratingCount,
      code,
      coods,
    } = req.body;

    console.log(req.body);

    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        status: false,
        message: "These fields are required",
      });
    }

    const createResturant = await Resturant.create({
      title,
      description,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      address,
      rating,
      logoUrl,
      ratingCount,
      code,
      coods,
    });

    return res.status(200).json({
      status: true,
      message: "Resturant created successfully",
      data: createResturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500),json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      })
  }
};

const getAllResturant = async (req, res) => {
    try {
        const getAllResturant = await Resturant.find({});
        console.log(getAllResturant);

        if(!getAllResturant){
          return res.status(400).json({
            status: false,
            message: "Resturant not found",
            data: [],
          })
        }
        
        return res.status(200).json({
            status: true,
            message: "Resturant fetched successfully",
            total : getAllResturant.length,
            data: getAllResturant
          });

    } catch (error) {
        console.log(error);
        return res.status(500),json({
            status: false,
            message: "Internal Server Error",
            error: error.message,
          })
    }
}

const getResturantById = async (req, res) => {

  try {
    const {id} = req.params;

    const getResturantById = await Resturant.findById({_id : id});
    // console.log("getResturantById>>>>>>>>>", getResturantById);

    if (!getResturantById) {
      return res.status(400).json({
        status: false,
        message: "Resturant not found",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      message: "Resturant fetched successfully",
      data: getResturantById,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500),json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      })
  }
}

const deleteResturant = async (req, res) => {
  try {
    const {id} = req.params;
    
    const deleteResturant = await Resturant.findByIdAndDelete(id);
    // console.log("deleteResturant>>>>>>>>>", deleteResturant);

    if (!deleteResturant) {
      return res.status(400).json({
        status: false,
        message: "Resturant not found",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      message: "Resturant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500),json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      })  
  }
}

module.exports = { createResturant,getAllResturant ,getResturantById, deleteResturant };
