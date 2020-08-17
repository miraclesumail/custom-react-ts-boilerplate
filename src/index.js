const webpack = require("webpack");
const config = require("../webpack.config");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var app = require("express")();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.listen(3333, () => console.log("start service"));
