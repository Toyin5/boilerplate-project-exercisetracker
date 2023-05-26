const mongoose = require("mongoose");

const Exercise = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Exercise", Exercise);
