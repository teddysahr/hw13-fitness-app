const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// NAVIGATION ROUTES

app.get("/stats", (req, res) =>
  res.sendFile(path.join(__dirname, "public/stats.html"))
);

app.get("/exercise", (req, res) =>
  res.sendFile(path.join(__dirname, "public/exercise.html"))
);

//GET ALL WORKOUTS

app.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])
    .limit(7)
    .sort({ day: -1 })

    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//CREATE A NEW WORKOUT

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//make an update for workout

app.put("/api/workouts/:id", ({ params, body }, res) => {
  db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
