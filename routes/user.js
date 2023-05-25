const express = require("express");
const { addUser } = require("../controllers/user");
const router = express.Router();

router.post("/users", addUser);

module.exports = router;
