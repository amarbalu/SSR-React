const path = require("path");

module.exports = {
  target: "node",
  mode: "development",
  entry: path.resolve(__dirname, "server"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
