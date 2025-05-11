const express = require("express");
const morgan = require("morgan"); // morgan is a middleware for logging HTTP requests and responses
const dotenv = require("dotenv"); // dotenv is a module that loads environment variables from a .env file into process.env
const connectDB = require("./config/db"); // import the connectDB function from the db.js file

const app = express();
dotenv.config();

// connect to database
connectDB();

const cors = require("cors");
app.use(
  cors(
    // cors options
    {
      origin: "*", // allows requests from any origin
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // allows only GET, POST, PUT, DELETE, and PATCH methods
    }
  )
);

app.use(morgan("dev")); // morgan middleware to log HTTP requests in the console
app.use(express.json()); // middleware to parse JSON request body


//routes import
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoute");

// routes middleware 
app.use("/api/v1/auth", authRoute); // use the authRoute for all requests starting with "/api/v1/auth"
app.use("/api/v1/user", userRoute); // use the userRoute for all requests starting with "/api/v1/user"

app.get("/", (req, res) => {
  res.status(200).send("Hello World! This is Express app.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
