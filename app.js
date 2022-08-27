const path = require("path");
const express = require("express");
const feedRouter = require("./routes/feed");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGO_PASS } = require("./SECRET");

const MONGODB_URI = `mongodb+srv://raken:${MONGO_PASS}@cluster0.t7o7cnp.mongodb.net/messages?retryWrites=true&w=majority`;

const app = express();

//app.use(bodyParser.urlencoded({ extended: false })); //x-www-form-urlencoded
app.use(bodyParser.json()); //application/json
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRouter);
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

app.use((req, res, next) => {
  res.status(404).send(`<h1>page not found 404</h1>`);
});
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
