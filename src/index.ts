const webpack = require("webpack");
const config = require("../webpack.config");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
import redis from "redis";
import { verifyToken } from "../server/middlewares";
import CommonRoute from "../server/routes/common";
const { APIError, HttpStatusCode } = require("./error");
import jwt from "jsonwebtoken";

// redis 掉线重连策略
function retry_strategy(options) {
  if (options.error && options.error.code === "ECONNREFUSED") {
    // End reconnecting on a specific error and flush all commands with
    // a individual error
    return new Error("The server refused the connection");
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands
    // with a individual error
    return new Error("Retry time exhausted");
  }
  if (options.attempt > 10) {
    // End reconnecting with built in error
    return undefined;
  }
  // reconnect after
  return Math.min(options.attempt * 100, 3000);
}

export const redisClient = redis.createClient(6379, "127.0.0.1", {
  retry_strategy
});

var app = express();
const compiler = webpack(config);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static("/"));

app.use(
  webpackDevMiddleware(compiler, {
    writeToDisk: filePath => /\.html$/.test(filePath)
  })
);
app.use(webpackHotMiddleware(compiler));

const addUser = () => {
  throw new APIError(
    "NOT FOUNDqqqq",
    HttpStatusCode.NOT_FOUND,
    "detailedsssss  exeeeplana",
    true
  );
};

app.use("/api", verifyToken);
app.use("/common", CommonRoute);

app.post("/login", function(req, res, next) {
  console.log(req.body, "req.body");
  const token = jwt.sign({ name: req.body.name }, "bear", { expiresIn: 60 });
  res.status(200).json({ auth: true, token: token });
});

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
    return next(error);
  }
  //   res.json({
  //     msg: "msg",
  //     status: 200
  //   });
});

app.get("*", (req, res, next) => {
  compiler.outputFileSystem.readFile(
    path.join(__dirname, "../dist/index.html"),
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    }
  );
});

app.use((err, req, res, next) => {
  res.status(err.httpCode).json({
    err: err.name
  });
});

app.listen(3333, () => console.log("start service"));
