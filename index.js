const express = require("express");
const morgan = require("morgan"); // morgan is a middleware for logging HTTP requests and responses
const dotenv = require("dotenv"); // dotenv is a module that loads environment variables from a .env file into process.env
const connectDB = require("./config/db"); // import the connectDB function from the db.js file

// rest object  this app object is an instance of express class means express is a class and app is an object of that class
// express is a function that returns an object with methods to handle HTTP requests and responses
const app = express();
dotenv.config(); // loads environment variables from .env file into process.env

// connect to database
connectDB();

// middleware
// cors is a middleware function that enables Cross-Origin Resource Sharing (CORS) for the application
// CORS means it allows the server to accept requests from different origins (domains) for example http://localhost:3000 or http://localhost:3001
const cors = require("cors");
app.use(
  cors(
    // cors options
    {
      origin: "*", // allows requests from any origin
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // allows only GET, POST, PUT, DELETE, and PATCH methods
      //   allowedHeaders: ["Content-Type"], // allows only Content-Type header
    }
  )
);

// morgan("dev") is a predefined format that logs the request method, URL, status code, response time, and other details in a concise format
app.use(morgan("dev")); // morgan middleware to log HTTP requests in the console

// express.json() is a built-in middleware function in Express that parses incoming JSON requests and puts the parsed data in req.body
// means it converts the JSON data in the request body by client into a JavaScript object
// this is useful when you want to handle JSON data sent in the request body
app.use(express.json()); // middleware to parse JSON request body

// route handling
// app.get() is used to define a route for GET requests
// "/" is the path for the route, which means the root URL of the application
// URL = http://localhost:3000/
// req is the request object that contains information about the incoming request
// res is the response object that is used to send a response back to the client

//routes import
const authRoute = require("./routes/authRoutes");
const testRoute = require("./routes/testRoute");
const userRoute = require("./routes/userRoute");
const restorantRoute = require("./routes/resturantRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const foodRoute = require("./routes/foodRoutes");

// routes middleware 
app.use("/api/v1", testRoute); // use the testRoute for all requests starting with "/api/v1"
app.use("/api/v1/auth", authRoute); // use the authRoute for all requests starting with "/api/v1/auth"
app.use("/api/v1/user", userRoute); // use the userRoute for all requests starting with "/api/v1/user"
app.use("/api/v1/resturant", restorantRoute); // use the resturantRoute for all requests starting with "/api/v1/resturant"
app.use("/api/v1/category", categoryRoute); // use the categoryRoute for all requests starting with "/api/v1/category"
app.use("/api/v1/food", foodRoute);

app.get("/", (req, res) => {
  res.status(200).send("Hello World! This is Express app.");
});

const PORT = process.env.PORT || 3000; // PORT is the environment variable that specifies the port number for the server to listen on
// console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
