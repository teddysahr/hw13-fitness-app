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

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/userdb",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

// NAVIGATION ROUTES

app.get("/stats", (req, res) =>
  res.sendFile(path.join(__dirname, "public/stats.html"))
);

app.get("/exercise", (req, res) =>
  res.sendFile(path.join(__dirname, "public/exercise.html"))
);

//GET ALL WORKOUTS

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbNote) => {
      res.json(dbNote);
    })
    .catch((err) => {
      res.json(err);
    });
});

//CREATE A NEW WORKOUT

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//make an update for workout

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
