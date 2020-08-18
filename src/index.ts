const webpack = require("webpack");
const config = require("../webpack.config");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
var bodyParser = require("body-parser");
const { APIError, HttpStatusCode } = require("./error");
var app = express();

const compiler = webpack(config);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get("/api/data", function(req, res) {
  res.json({
    msg: "msg",
    status: 200
  });
});

const addUser = () => {
  throw new APIError(
    "NOT FOUNDqqqq",
    HttpStatusCode.NOT_FOUND,
    "detailedsssss  exeeeplanation",
    true
  );
};
app.post("/api/save", function(req, res, next) {
  // next(
  //   new APIError(
  //     "NOT FOUNDqqqq",
  //     HttpStatusCode.NOT_FOUND,
  //     "detailedsssss  exeeeplanation",
  //     true
  //   )
  // );
  try {
    addUser();
  } catch (error) {
    console.log(error, "catch error");
    return next(error);
  }
  //   res.json({
  //     msg: "msg",
  //     status: 200
  //   });
});

app.use((err, req, res, next) => {
  console.log("err----");
  console.log(err);
  res.status(err.httpCode).json({
    err: err.name
  });
});

app.listen(3333, () => console.log("start service"));
