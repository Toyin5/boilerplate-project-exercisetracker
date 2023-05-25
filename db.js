const mongoose = require("mongoose");

async function database() {
  //   mongoose.set("strictQuery", false);
  return await mongoose
    .connect(process.env.MONGO)
    .then((res) => console.log("connection success : ", res.options.autoIndex))
    .catch((err) => console.log("connection failed : ", err));
}

module.exports = database;
