const express = require("express");
const feedRouter = require("./routes/feed");
const bodyParser = require("body-parser");

const app = express();

//app.use(bodyParser.urlencoded({ extended: false })); //x-www-form-urlencoded
app.use(bodyParser.json()); //application/json

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

app.use((req, res, next) => {
  res.status(404).send(`<h1>page not found 404</h1>`);
});

app.listen(3000);
