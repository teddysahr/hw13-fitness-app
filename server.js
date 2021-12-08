const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

//const User = require("./userModel.js");
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

// app.post("/submit", ({ body }, res) => {
//   User.create(body)
//     .then((dbUser) => {
//       res.json(dbUser);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// app.get("/exercises", (req, res) => {
//   db.Exercise.find({})
//     .then((dbNote) => {
//       res.json(dbNote);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//app.get("/exercise", (req, res) => res.send("NICE!"));

app.get("/stats", (req, res) =>
  res.sendFile(path.join(__dirname, "public/stats.html"))
);

app.get("/exercise", (req, res) =>
  res.sendFile(path.join(__dirname, "public/exercise.html"))
);

//make a find for workout

//make an insert for workout

//make an update for workout

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
