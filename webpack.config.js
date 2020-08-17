const { resolve, join } = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // pageA: "./src/page-a",
    // pageB: "./src/page-b",
    // pageC: "./src/page-c",
    app: ["./src/app.tsx", "webpack-hot-middleware/client.js"]
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].bundle.js"
    // publicPath: "/static/"
  },
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: "vendors-haha",
          test: /[\\/]node_modules[\\/]/, // 匹配node_modules目录下的文件
          priority: -10, // 优先级配置项
          minSize: 810000
        },
        common: {
          name: "common-bundle",
          test: /axios|inquirer/,
          priority: 10
        },
        reactBase: {
          test: module => {
            return /react-redux|redux|redux-thunk/.test(module.context);
          }, // 直接使用 test 来做路径匹配，抽离react相关代码
          chunks: "initial",
          priority: 10,
          minSize: 3000
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // 也可以写成presets:['babel-preset-env']
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  externals: {
    jquery: "jQuery"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: true,
    //   statsOptions: { source: false },
    //   analyzerPort: 8889
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      //   filename: "qwe.html",
      title: "titlelel",
      template: "./src/main.html"
    })
  ]
};
