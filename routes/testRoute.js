const express = require("express");
const { testController } = require("../controller/testController");

const router = express.Router(); // create a new router object using express.Router()

// Define a route for GET requests to "/test"
router.get("/test", testController); // when a GET request is made to "/test", call the testController function

module.exports = router; // export the router object so it can be used in other files
