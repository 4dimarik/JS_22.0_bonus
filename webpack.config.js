const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/bundle.js",
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
  },
};
