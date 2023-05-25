require("dotenv").config();
const express = require("express");
const database = require("./db");
const cors = require("cors");
const router = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded());

database();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api", router);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
