const express = require("express");
const {
  addUser,
  getUsers,
  addExercise,
  getLogs,
} = require("../controllers/user");
const router = express.Router();

router.post("/users", addUser);
router.get("/users", getUsers);
router.post("/users/:_id/exercises", addExercise);
router.get("/users/:_id/logs", getLogs);

module.exports = router;
