const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", User);
