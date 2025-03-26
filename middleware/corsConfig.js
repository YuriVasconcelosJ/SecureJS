const cors = require("cors");

const corsOption = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOption);
