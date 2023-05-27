const Exercise = require("../models/Exercise");
const User = require("../models/User");
async function addUser(req, res) {
  try {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    res.json({ username: user.username, _id: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

async function getUsers(_, res) {
  const users = await User.find({});
  res.json(users);
}

async function addExercise(req, res) {
  const owner = req.params._id;
  let { description, date } = req.body;
  const duration = parseInt(req.body.duration);

  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }

  const user = await User.findById(owner);
  if (user) {
    const newExercise = new Exercise({ duration, description, date, owner });
    await newExercise.save();
    const { __v, ...parsedUser } = user["_doc"];
    return res.json({
      ...parsedUser,
      duration,
      description,
      date: newExercise.date.toDateString(),
    });
  }
  return res.json({ message: "Id not found" });
}

async function getLogs(req, res) {
  console.log(req.query);
  console.log("There is a query");
  const owner = req.params._id;
  const limit = parseInt(req.query.limit);
  const to = new Date(req.query.to);
  const from = new Date(req.query.from);
  console.log(to);
  const user = await User.findById(owner);
  let arr = [];
  if (user) {
    const filter = { owner: user._id };
    if (to != "Invalid Date" && from != "Invalid Date") {
      filter["date"] = {
        $gte: from,
        $lte: to,
      };
    }
    const exercises = await Exercise.find(filter);
    exercises.map((exercise) => {
      arr.push({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      });
    });
    if (limit) {
      arr = arr.slice(0, limit);
    }
    arr.forEach((a) => {
      a.date = new Date(a.date).toDateString();
    });
    console.log(arr);
    const { __v, ...parsedUser } = user["_doc"];
    return res.json({ ...parsedUser, count: arr.length, log: arr });
  }
}
module.exports = { addUser, getUsers, addExercise, getLogs };
