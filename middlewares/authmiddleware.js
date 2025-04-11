const jwt = require("jsonwebtoken"); // import the jsonwebtoken module for generating and verifying JWT tokens

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extract the token from the Authorization header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token using the JWT_SECRET environment variable
    req.user = decoded; // attach the decoded user object to the request object
    next(); // call the next middleware function in the chain
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }
};
