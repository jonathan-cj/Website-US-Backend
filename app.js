const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const process = require("process");

const lineup = require("./api/routes/LineupRoutes");

const app = express();

// SETUP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get("/", (_, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.use("/lineup", lineup);

// Catch error 404
app.use((_, res, next) => {
  next(createError.NotFound());
});

// React on SIGINT and SIGTERM to gracefully shutdown
process.on("SIGINT", () => {
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});

module.exports = app;
