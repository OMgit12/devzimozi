const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect() is used to connect to a MongoDB database using the connection string from the environment variable
    await mongoose.connect(process.env.MONGO_URL); // MONGO_URI is the environment variable that contains the connection string for MongoDB
    console.log(
      `Connected to MongoDB successfully ${mongoose.connection.host}`
    ); // logs a message indicating successful connection to MongoDB
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;
