const testController = (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "Hello World! This is Express app.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { testController }; // export the testController function so it can be used in other files
