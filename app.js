const express = require("express");
const feedRouter = require("./routes/feed");

const app = express();

app.use(feedRouter);

app.use((req, res, next) => {
  res.status(404).send(`<h1>page not found 404</h1>`);
});

app.listen(3000);
